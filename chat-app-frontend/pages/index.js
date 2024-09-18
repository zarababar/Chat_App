// pages/index.js
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Chat Application</h1>
            <Link href="/chat">
                Go to Chat
            </Link>
        </div>
    );
}
