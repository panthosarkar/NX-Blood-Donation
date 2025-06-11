// Define the prop types for MessageTemplate component
export interface Message {
  type: "error" | "success" | "warning" | "info";
  text: string | null;
  timeout?: number;
}

export interface MessageTemplateProps {
  message: Message;
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
  price?: number;
}
