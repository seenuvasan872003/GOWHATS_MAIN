// Create a new file src/utils/messageStatus.js
export const MessageStatus = {
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed'
  };
  
  // Update the message objects to include status
  const newMessage = {
    id: selectedContact.messages.length + 1,
    text: inputMessage.trim() !== '' ? inputMessage : null,
    sent: true,
    timestamp: new Date(),
    file: file,
    status: MessageStatus.SENT,
    whatsappMessageId: null // Store the WhatsApp message ID when received
  };