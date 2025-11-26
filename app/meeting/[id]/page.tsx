"use client";

import "@livekit/components-styles";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Clock, Music, Home, Calendar, Video, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  const params = useParams();
  const rawId = params?.id;
  const room = Array.isArray(rawId) ? rawId[0] : rawId ?? "";
  const name = "User-" + Math.floor(Math.random() * 1000);
  console.log("room", room);

  const [token, setToken] = useState("");
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [notAllowedMessage, setNotAllowedMessage] = useState<string | null>(
    null
  );
  const [meetingTime, setMeetingTime] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string | null>(null);
  const [showEndSoonPopup, setShowEndSoonPopup] = useState(false);
  const [meetingEnded, setMeetingEnded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // First, check that the meeting/booking is valid and it's time to join
        setChecking(true);
        // if no room param yet, skip
        if (!room) {
          setNotAllowedMessage("Missing meeting id in URL");
          setChecking(false);
          return;
        }

        const checkResp = await fetch(
          `/api/token/check?room=${encodeURIComponent(room)}`
        );

        const checkData = await checkResp.json();
        console.log("checkData", checkData);

        if (!checkData.ok) {
          setAllowed(false);
          setNotAllowedMessage(checkData.message || "Meeting not available");
          // API may return meetingTime or booking.time
          if (checkData.meetingTime) setMeetingTime(checkData.meetingTime);
          if (checkData.booking?.time) setMeetingTime(checkData.booking.time);
          setChecking(false);
          return;
        }

        // If server returned booking time, keep it for end-time calculations
        if (checkData.booking?.time) setMeetingTime(checkData.booking.time);

        setAllowed(true);

        // Now fetch the token from our backend
        const resp = await fetch(
          `/api/token?room=${encodeURIComponent(
            room
          )}&username=${encodeURIComponent(name)}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
        setNotAllowedMessage("Error fetching token");
      } finally {
        setChecking(false);
      }
    })();
  }, [room]);

  // Poll the server while meeting hasn't started yet to auto-start without refresh
  useEffect(() => {
    if (!meetingTime || allowed || meetingEnded) return;

    let cancelled = false;
    const poll = async () => {
      try {
        const resp = await fetch(
          `/api/token/check?room=${encodeURIComponent(room)}`
        );
        const data = await resp.json();
        if (!data) return;
        if (data.ok && !cancelled) {
          // meeting is now allowed — fetch token and join
          setAllowed(true);
          if (data.booking?.time) setMeetingTime(data.booking.time);
          const tokResp = await fetch(
            `/api/token?room=${encodeURIComponent(
              room
            )}&username=${encodeURIComponent(name)}`
          );
          const tokData = await tokResp.json();
          setToken(tokData.token);
        }
      } catch (err) {
        console.warn("poll error", err);
      }
    };

    // Poll more frequently when close to start
    const tryUpdate = () => {
      const target = new Date(meetingTime!).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const interval = diff <= 60_000 ? 1000 : 5000; // 1s in last minute, otherwise 5s
      poll();
      const id = setInterval(poll, interval);
      return () => clearInterval(id);
    };

    const cleanup = tryUpdate();
    return () => {
      cancelled = true;
      cleanup && cleanup();
    };
  }, [meetingTime, allowed, meetingEnded, room, name]);

  // Monitor meeting end and show "ending soon" popup
  useEffect(() => {
    if (!meetingTime || !allowed) return;

    const AFTER_WINDOW_MS = 60 * 60 * 1000; // same as server
    const NEAR_END_MS = 2 * 60 * 1000; // show popup 2 minutes before end

    const targetEnd = new Date(meetingTime).getTime() + AFTER_WINDOW_MS;
    let popupShown = false;

    const tick = () => {
      const now = Date.now();
      const remaining = targetEnd - now;

      if (remaining <= 0) {
        // End meeting now
        setMeetingEnded(true);
        setShowEndSoonPopup(false);
        setToken("");
        setAllowed(false);
        setNotAllowedMessage("meeting ended");
        return;
      }

      // show near-end popup once
      if (!popupShown && remaining <= NEAR_END_MS) {
        popupShown = true;
        setShowEndSoonPopup(true);
        try {
          // quick beep using WebAudio
          const ctx = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = "sine";
          o.frequency.value = 880;
          o.connect(g);
          g.connect(ctx.destination);
          o.start();
          g.gain.setValueAtTime(0.001, ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
          o.stop(ctx.currentTime + 0.45);
        } catch (e) {
          console.warn("beep failed", e);
        }
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [meetingTime, allowed]);

  // Countdown effect when meetingTime is present
  useEffect(() => {
    if (!meetingTime) {
      setCountdown(null);
      return;
    }

    let mounted = true;
    const target = new Date(meetingTime).getTime();

    const update = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        if (mounted) setCountdown("Starting now");
        return;
      }
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      const parts: string[] = [];
      if (hrs) parts.push(`${hrs}h`);
      if (mins || hrs) parts.push(`${mins}m`);
      parts.push(`${secs}s`);
      if (mounted) setCountdown(parts.join(" "));
    };

    update();
    const id = setInterval(update, 1000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [meetingTime]);

  const toggleAudio = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (e) {
      console.warn("Audio play failed:", e);
    }
  };

  if (checking) {
    return <div></div>;
  }

  if (meetingEnded) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-lg w-full">
          <Card className="text-center bg-white shadow-xl border-0 overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-5 rounded-full">
                  <Video className="w-12 h-12 text-gray-600" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl mb-4 text-gray-800">
                Meeting Ended
              </h2>
              <p className="text-gray-600 mb-8">
                This meeting has reached its scheduled end time.
              </p>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
              >
                <a href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Return to home screen
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!allowed) {
    // If meetingTime is present and message indicates it's not started, show friendly UI
    if (
      meetingTime &&
      (notAllowedMessage?.toLowerCase().includes("not started") ||
        notAllowedMessage?.toLowerCase().includes("not started yet"))
    ) {
      const formatted = new Date(meetingTime).toLocaleString();
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 sm:p-8 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-100/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-2xl w-full relative z-10">
            {/* Header Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 p-6 rounded-full shadow-lg">
                  <Video className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Main Content Card */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
              <div className="p-8 sm:p-12 text-center">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Meeting Scheduled</span>
                </div>

                <h1 className="text-3xl sm:text-4xl mb-4 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  Your meeting will start soon
                </h1>

                <p className="text-gray-600 mb-8">
                  Please wait while we prepare your virtual room
                </p>

                {/* Meeting Time Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-100 shadow-sm">
                  <div className="flex items-center justify-center gap-2 text-green-700 mb-3">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm uppercase tracking-wide">
                      Scheduled for
                    </span>
                  </div>
                  <div className="text-2xl mb-4 text-gray-800">{formatted}</div>

                  {countdown && (
                    <div className="inline-flex items-center gap-2 bg-white/80 px-6 py-3 rounded-full shadow-sm border border-green-200">
                      <Clock className="w-5 h-5 text-green-600 animate-pulse" />
                      <span className="text-green-700">
                        Starts in:{" "}
                        <span className="font-mono">{countdown}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-300"
                  >
                    <a href="/">
                      <Home className="w-5 h-5 mr-2" />
                      Return to home
                    </a>
                  </Button>
                </div>
              </div>

              {/* Bottom Accent Bar */}
            </Card>
          </div>
        </div>
      );
    }

    // Generic error / not found UI
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="max-w-lg w-full">
          <Card className="text-center bg-white shadow-xl border-0 overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="flex justify-center mb-6">
                <div className="bg-red-100 p-5 rounded-full">
                  <Video className="w-12 h-12 text-red-600" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl mb-4 text-gray-800">
                Meeting Not Found
              </h2>
              <p className="text-gray-600 mb-8">
                The meeting code you entered doesn't work. Please check the URL
                and try again.
              </p>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
              >
                <a href="/">
                  <Home className="w-5 h-5 mr-2" />
                  Return to home screen
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (token === "") {
    return <div>Getting token...</div>;
  }

  return (
    <>
      {showEndSoonPopup && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-white border shadow-lg rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">
                Meeting ending soon
              </div>
              <div className="text-xs text-gray-600">
                The meeting will end at the scheduled time.
              </div>
            </div>
            <div>
              <button
                className="text-xs text-gray-500 hover:text-gray-700"
                onClick={() => setShowEndSoonPopup(false)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        // Use the default UI styles
        data-lk-theme="default"
        style={{ height: "100vh" }}
      >
        {/* Your Google Meet style video grid */}
        <VideoConference />
      </LiveKitRoom>
    </>
  );
}
