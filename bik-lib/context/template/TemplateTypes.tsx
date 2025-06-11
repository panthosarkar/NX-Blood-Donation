// Define the prop types for MessageTemplate component
export interface Message {
  text: string | null;
  timeout?: number;
}

export interface MessageTemplateProps {
  message: Message;
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
}
