import Error from "@/app/error";
import ChatContainer from "@/components/chatContainer/chatContainer";

const getChatSessionDetails = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/chat/${id}`, {});
  return res.json();
};

interface ChatSessionDetailsProps {
  params: {
    id: string;
  };
}

export default async function ChatSessionDetails({
  params,
}: ChatSessionDetailsProps) {
  const { id } = await params;
  const { chatSession } = await getChatSessionDetails(id);

  if (chatSession?.errMessage) {
    return <Error error={chatSession} />;
  }

  return <ChatContainer chatSessionId={id} history={chatSession.history} />;
}
