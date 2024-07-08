"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const AdminPage = () => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        fetchMessages();
      }
    };

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data);
      }
    };

    checkSession();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin - Messages</h1>
      <ul>
        {messages.map((message) => (
          <li
            key={message.id}
            className="mb-4 p-4 border border-gray-300 rounded"
          >
            <p>
              <strong>Name:</strong> {message.name}
            </p>
            <p>
              <strong>Email:</strong> {message.email}
            </p>
            <p>
              <strong>Message:</strong> {message.message}
            </p>
            <p>
              <small>
                <strong>Received at:</strong>{" "}
                {new Date(message.created_at).toLocaleString()}
              </small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
