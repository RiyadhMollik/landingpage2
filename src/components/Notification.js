'use client';

import React, { useEffect, useState } from "react";
import "./Notification.css";

const notifications = [
    { message: "হাসান রংপুর থেকে প্যারচেজ করেছেন", time: "1 সেকেন্ড আগে" },
    { message: "রিমন ঢাকা থেকে প্যারচেজ করেছেন", time: "2 সেকেন্ড আগে" },
    { message: "সুমন চট্টগ্রাম থেকে প্যারচেজ করেছেন", time: "3 সেকেন্ড আগে" },
    { message: "আনিস খুলনা থেকে প্যারচেজ করেছেন", time: "4 সেকেন্ড আগে" },
    { message: "রাহুল বরিশাল থেকে প্যারচেজ করেছেন", time: "5 সেকেন্ড আগে" },
    { message: "ফারহান সিলেট থেকে প্যারচেজ করেছেন", time: "6 সেকেন্ড আগে" },
    { message: "মমিন কুমিল্লা থেকে প্যারচেজ করেছেন", time: "7 সেকেন্ড আগে" },
    { message: "তানভীর ময়মনসিংহ থেকে প্যারচেজ করেছেন", time: "8 সেকেন্ড আগে" },
    { message: "সাবির রাজশাহী থেকে প্যারচেজ করেছেন", time: "9 সেকেন্ড আগে" },
    { message: "নাসিম কক্সবাজার থেকে প্যারচেজ করেছেন", time: "10 সেকেন্ড আগে" },
    { message: "জাহিদ চাঁদপুর থেকে প্যারচেজ করেছেন", time: "2 সেকেন্ড আগে" },
    { message: "আরিফ পিরোজপুর থেকে প্যারচেজ করেছেন", time: "5 সেকেন্ড আগে" },
    { message: "সেলিম নরসিংদী থেকে প্যারচেজ করেছেন", time: "3 সেকেন্ড আগে" },
    { message: "মোস্তাফা যশোর থেকে প্যারচেজ করেছেন", time: "7 সেকেন্ড আগে" },
    { message: "রুবেল ভোলা থেকে প্যারচেজ করেছেন", time: "9 সেকেন্ড আগে" },
    { message: "ইমরান শেরপুর থেকে প্যারচেজ করেছেন", time: "6 সেকেন্ড আগে" },
    { message: "সেলিম গাইবান্ধা থেকে প্যারচেজ করেছেন", time: "4 সেকেন্ড আগে" },
    { message: "মাহমুদ নেত্রকোণা থেকে প্যারচেজ করেছেন", time: "8 সেকেন্ড আগে" },
    { message: "প্রীতি ফরিদপুর থেকে প্যারচেজ করেছেন", time: "1 সেকেন্ড আগে" },
    { message: "কিরণ বগুড়া থেকে প্যারচেজ করেছেন", time: "10 সেকেন্ড আগে" },
    { message: "নাফিস ঝালকাঠি থেকে প্যারচেজ করেছেন", time: "3 সেকেন্ড আগে" },
    { message: "আলিফ মুন্সিগঞ্জ থেকে প্যারচেজ করেছেন", time: "9 সেকেন্ড আগে" },
    { message: "শিহাব পটুয়াখালী থেকে প্যারচেজ করেছেন", time: "5 সেকেন্ড আগে" },
    { message: "হুমায়ুন চাঁপাইনবাবগঞ্জ থেকে প্যারচেজ করেছেন", time: "2 সেকেন্ড আগে" },
    { message: "রুশদী সোনাগাজী থেকে প্যারচেজ করেছেন", time: "7 সেকেন্ড আগে" },
    { message: "মাহনূন দিনাজপুর থেকে প্যারচেজ করেছেন", time: "4 সেকেন্ড আগে" },
    { message: "জুবায়ের লালমনিরহাট থেকে প্যারচেজ করেছেন", time: "8 সেকেন্ড আগে" },
    { message: "সুমন কিশোরগঞ্জ থেকে প্যারচেজ করেছেন", time: "6 সেকেন্ড আগে" },
    { message: "মিঠু টাঙ্গাইল থেকে প্যারচেজ করেছেন", time: "1 সেকেন্ড আগে" },
    { message: "রাশিদ বন্যারচর থেকে প্যারচেজ করেছেন", time: "10 সেকেন্ড আগে" },
    { message: "সানি নারায়ণগঞ্জ থেকে প্যারচেজ করেছেন", time: "2 সেকেন্ড আগে" },
    { message: "নাজিম শ্রীমঙ্গল থেকে প্যারচেজ করেছেন", time: "9 সেকেন্ড আগে" },
    { message: "তাসনিম কিশোরগঞ্জ থেকে প্যারচেজ করেছেন", time: "4 সেকেন্ড আগে" },
    { message: "ফারহান বান্দরবান থেকে প্যারচেজ করেছেন", time: "7 সেকেন্ড আগে" },
    { message: "মিরাজ নওগাঁ থেকে প্যারচেজ করেছেন", time: "3 সেকেন্ড আগে" },
];

export default function Notification() {
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        setVisible(true);

        // Hide after 5s
        const showTimeout = setTimeout(() => setVisible(false), 5000);

        // Show next random notification after 10s
        const nextTimeout = setTimeout(() => {
            setCurrent(() => {
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * notifications.length);
                } while (randomIndex === current); // prevent same message twice in a row
                return randomIndex;
            });
        }, 10000);

        return () => {
            clearTimeout(showTimeout);
            clearTimeout(nextTimeout);
        };
    }, [current]);

    return (
        <div className={`notification ${visible ? "slide-in" : "slide-out"}`}>
            <div>🎉 {notifications[current].message}</div>
            <div style={{ fontSize: "14px" }}>⏰ {notifications[current].time}</div>
        </div>
    );
}