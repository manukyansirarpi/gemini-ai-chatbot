import Error from "@/app/error";
import ChatContainer from "@/components/chatContainer/chatContainer";

const getChatSessionDetails = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/chat/${id}`, {});
  return res.json();
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { chatSession } = await getChatSessionDetails(id);

  if (chatSession?.errMessage) {
    return <Error error={chatSession} />;
  }

  return <ChatContainer chatSessionId={id} history={chatSession.history} />;
}
