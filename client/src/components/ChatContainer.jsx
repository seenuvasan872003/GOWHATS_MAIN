import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import { BanIcon, ChevronDownIcon, EditIcon, SearchIcon, Mic, Send, SmileIcon, Search, X, Trash2, Pencil, Check } from "lucide-react"; // Imported icons
import { Paperclip, Image, Camera, FileText, User, BotIcon, UserIcon, Wallet, Landmark, ListFilter, LayoutPanelTop, } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import RatingStars from "./LastOrder/RatingStars";
import { useAuth } from "../context/AuthContext"; // Adjust the path based on your project structure
import { sendTemplateMessage } from '../services/messageService';


// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Sidebar = styled.div`
  width: 320px;
  background: #ffffff;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
`;

const SearchBar = styled.input`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
`;

const ContactList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ContactItem = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#e9f5ff" : "#ffffff")};
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background-color: #f5f5f5;
  }

  .avatar {
    width: 40px;
    height: 40px;
    background: #4caf50;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 16px;
    margin-right: 10px;
  }

  .contact-details {
    flex: 1;

    .contact-name {
      font-weight: bold;
      font-size: 14px;
    }

    .last-message {
      font-size: 12px;
      color: #888;
    }
  }

  .timestamp {
    font-size: 12px;
    color: #bbb;
  }
`;

const ChatArea = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
`;

const ChatHeader = styled.div`
  padding: 15px;
  background: #4caf50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-details {
    width:full;
    margin-left: 10px;
    display:flex;
    


    .avatar-header {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    
    .headavatar{
      width: 40px;
      height: 40px;
    }

    .chat-name {
      font-size: 16px;
      font-weight: bold;
    }

    .status {
      font-size: 12px;
    }
    
    
  }
`;

const Messages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #e5ddd5;

  .message {
    max-width: 60%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    word-wrap: break-word;
    font-size: 14px;
  }

  .sent {
    margin-left: auto;
    background: #dcf8c6;
  }

  .received {
    margin-right: auto;
    background: #ffffff;
    border: 1px solid #ddd;
  }

  .timestamp {
    font-size: 10px;
    color: #888;
    text-align: right;
  }
`;

const MessageInput = styled.div`
  padding: 10px;
  background: white;
  display: flex;

  .input-field {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 14px;
  }

  .send-button {
    margin-left: 10px;
    padding: 10px;
    border: none;
    background: #4caf50;
    color: white;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const ChatProfile = styled.div`
  width: 450px;
  background: #ffffff;
  border-left: 1px solid #ddd;
  overflow-y: auto;
`;

/* Profile Container */
const ProfileContainer = styled.div`
  padding: 16px;
`;

/* Profile Header */
const ProfileHeader = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .profile-header-content{
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .profile-info{
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .avatar{
    width: 64px;
    height: 64px;
    background-color: #16a34a;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
  }
  .contact-name{
  font-size: 1.125rem;
  font-weight: 700;
  }
  .contact-phone{
  color: #6b7280;
  font-size: 0.875rem;
  }
  .block-button{
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background-color: #ef4444;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dc2626;
  }
  }

`;


const Tabs = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.div`
  width: 50%;
  padding: 12px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

/* Order Summary */
const OrderSummary = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

const OrderSummaryCard = styled.div`
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const OrderSummaryTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const OrderSummaryValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const WalletHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const EditButton = styled.div`
  padding: 4px;
  color: #6b7280;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

/* Last Order */
const LastOrder = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LastOrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const LastOrderId = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
`;

const SearchButton = styled.div`
  padding: 4px;
  color: #6b7280;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const LastOrderStatus = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const StatusTag = styled.div`
  background-color: #10b981;
  color: #064e3b;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 12px;
`;

const OrderDate = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
`;

const LastOrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrderTotal = styled.div`
  font-weight: 700;
`;

const DetailsButton = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

/* WooCommerce Notes */
const WooCommerceNotes = styled.div`
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NotesTabs = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 16px;
`;

const NotesTab = styled.div`
  width: 50%;
  padding: 12px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const NotesContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Note = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NoteLabel = styled.div`
  font-weight: 500;
`;

const NoteInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const NoteValue = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
`;

const EditNote = styled.div`
  padding: 4px;
  color: #6b7280;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const ChatApp = () => {
  // Frontend state from first implementation
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");
  const [isChatbot, setIsChatbot] = useState(true);
  const [assistedSalesMode, setAssistedSalesMode] = useState("Chatbot");
  const [showWallet, setShowWallet] = useState(false);
  const [activetab, setactivetab] = useState("Address");
  const [email, setEmail] = useState("mjperso15@gmail.com");
  const [address, setAddress] = useState("No address provided");
  const [editingField, setEditingField] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  

  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        "https://graph.facebook.com/v22.0/561944603661054/message_templates",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer EAARP85OnlCIBO4lDhwhnJVxVrSy1u8O9CDZCLjsuRzBWP9a0MbQJf6hc1OZBY5dHskIxIPOINqy6jwQ6I7WsPUNfipgsTXo55gzOZCXkdmfzmv0ZBoKMlpoAjPldiW0ZABNdwxx3OYTvnrlDINzZC9tcACbsaeDXHV3alZAdytNZBe0POkO3Krz4WG9jn2OMHlkgWAZDZD`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      
      if (data && data.data) {
        setTemplates(data.data); // Ensure you access the correct property
      } else {
        console.error("Invalid response format:", data);
        setTemplates([]);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      setTemplates([]);
    }
  };

  const sendTemplate = async (template) => {
    if (!template || !template.name) {
      console.error("No template selected");
      return;
    }
  
    const recipient = "recipient_phone_number"; // Replace with the actual number (with country code)
    const params = {}; // Add parameters if your template needs them
  
    try {
      const response = await sendTemplateMessage(template.name, recipient, params);
      console.log("Template message sent successfully:", response);
    } catch (error) {
      console.error("Error sending template message:", error);
    }
  };
  
  

  // Backend state from second implementation
  const [unreadCounts, setUnreadCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  // Notes handling functions
  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleEditNote = (index) => {
    setEditingIndex(index);
    setEditText(notes[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = editText;
    setNotes(updatedNotes);
    setEditingIndex(null);
  };

  // Search and edit functions
  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = () => {
    setEditingField(null);
  };

  // Load contacts with proper sorting and persistence
  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/contacts");
        if (response.data) {
          const sortedContacts = response.data.sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
          );
          setContacts(sortedContacts);
          localStorage.setItem('contacts', JSON.stringify(sortedContacts));
        }
      } catch (error) {
        const savedContacts = localStorage.getItem('contacts');
        if (savedContacts) {
          setContacts(JSON.parse(savedContacts));
        }
        console.error('Error loading contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadContacts();
    }
  }, [user]);

  useEffect(() => {
    if (!selectedContact?.phone_number || !user) return;
  
    let isMounted = true;
  
    const loadMessages = async () => {
      try {
        const savedMessages = localStorage.getItem(
          `messages_${selectedContact.phone_number}`
        );
        if (savedMessages && isMounted) {
          setMessages(JSON.parse(savedMessages));
        }
  
        const response = await api.get('/api/messages', {
          params: { phone_number: selectedContact.phone_number }
        });
  
        if (response.data && isMounted) {
          setMessages(response.data);
          localStorage.setItem(
            `messages_${selectedContact.phone_number}`,
            JSON.stringify(response.data)
          );
        }
      } catch (error) {
        console.error('Error loading messages:', error);
        toast.error("Failed to load messages");
      }
    };
  
    loadMessages();
  
    return () => {
      isMounted = false;
    };
  }, [selectedContact, user]);
  

  // Socket connection
  useEffect(() => {
    if (!user) return;

    try {
      socket.current = io("http://localhost:5000", {
        auth: { token: localStorage.getItem('token') },
        query: { tenant_id: user.tenant_id },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
        transports: ['websocket']
      });

      socket.current.on('connect', () => {
        console.log('Socket connected for tenant:', user.tenant_id);
      });

      socket.current.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      socket.current.on('receive_message', (message) => {
        console.log('New message received:', message);
        
        if (selectedContact?.phone_number === message.from) {
          setMessages(prev => {
            const newMessages = [...prev, message];
            localStorage.setItem(
              `messages_${selectedContact.phone_number}`,
              JSON.stringify(newMessages)
            );
            return newMessages;
          });
          setUnreadCounts(prev => ({
            ...prev,
            [message.from]: 0
          }));
        } else {
          setUnreadCounts(prev => ({
            ...prev,
            [message.from]: (prev[message.from] || 0) + 1
          }));
        }

        setContacts(prev => {
          const existingContact = prev.find(c => c.phone_number === message.from);
          const updatedContact = {
            ...(existingContact || {}),
            phone_number: message.from,
            lastMessage: message.text,
            timestamp: message.timestamp,
            unreadCount: selectedContact?.phone_number === message.from ? 
              0 : ((existingContact?.unreadCount || 0) + 1)
          };

          const newContacts = existingContact ?
            prev.map(c => c.phone_number === message.from ? updatedContact : c) :
            [updatedContact, ...prev];

          const sortedContacts = newContacts.sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
          );

          localStorage.setItem('contacts', JSON.stringify(sortedContacts));
          return sortedContacts;
        });
      });

      socket.current.on('reconnect', (attemptNumber) => {
        console.log('Socket reconnected after', attemptNumber, 'attempts');
      });

      socket.current.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        if (reason === 'io server disconnect' || reason === 'transport close') {
          socket.current.connect();
        }
      });

    } catch (error) {
      console.error('Socket setup error:', error);
    }

    return () => {
      if (socket.current) {
        console.log('Cleaning up socket connection');
        socket.current.disconnect();
      }
    };
  }, [user]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact) {
      toast.error("Please select a contact and type a message");
      return;
    }

    const messageText = newMessage.trim();
    setNewMessage("");

    try {
      const response = await api.post("/api/messages/send", {
        to: selectedContact.phone_number,
        text: messageText
      });

      if (response.data) {
        setMessages(prev => {
          const msgExists = prev.some(m => 
            m.text === messageText && 
            new Date(m.timestamp).getTime() > Date.now() - 5000
          );
          if (msgExists) return prev;
          
          const newMessages = [...prev, response.data];
          localStorage.setItem(
            `messages_${selectedContact.phone_number}`,
            JSON.stringify(newMessages)
          );
          return newMessages;
        });

        setContacts(prev => {
          const updated = prev.map(contact => 
            contact.phone_number === selectedContact.phone_number
              ? {
                  ...contact,
                  lastMessage: messageText,
                  timestamp: new Date().toISOString()
                }
              : contact
          ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          
          localStorage.setItem('contacts', JSON.stringify(updated));
          return updated;
        });
      }
    } catch (error) {
      console.error('Send error:', error);
      toast.error("Failed to send message");
    }
  };

  // Handle contact selection
  const handleContactSelect = async (contact) => {
    setSelectedContact(contact);
    try {
      if (contact.unreadCount > 0) {
        await api.put(`/api/contacts/${contact._id}/read`);
        setContacts(prev => prev.map(c => 
          c._id === contact._id ? { ...c, unreadCount: 0 } : c
        ));
      }
    } catch (error) {
      console.error('Failed to clear unread count:', error);
    }
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    console.log("Full Emoji Object:", emoji);
    console.log("Selected Emoji:", emoji.native);
    setNewMessage((prevMessage) => (prevMessage || "") + emoji.native);
    setShowEmojiPicker(false);

    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const toggleMode = () => {
    setIsChatbot((prev) => !prev);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <Container>
      <Sidebar>
        <SearchBar placeholder="Search or start new chat" />
        <ContactList>
          {contacts.map((contact) => (
            <ContactItem
              key={contact._id}
              selected={selectedContact?._id === contact._id}
              onClick={() => handleContactSelect(contact)}
            >
              <div className="avatar">
                {contact.name?.[0]?.toUpperCase() || contact.phone_number?.[0]}
              </div>
              <div className="contact-details">
                <div className="contact-name">{contact.name || contact.phone_number}</div>
                <div className="last-message overflow-hidden h-3.5 w-50">{contact.lastMessage}</div>
              </div>
              <div className="timestamp">
                {dayjs(contact.timestamp).format("hh:mm A")}
              </div>
              {contact.unreadCount > 0 && (
                <div className="notification-bubble">
                  {contact.unreadCount}
                </div>
              )}
            </ContactItem>
          ))}
        </ContactList>
      </Sidebar>
  
      <ChatArea>
        {selectedContact ? (
          <>
            <ChatHeader>
              <div className="header-details relative">
                <div className="avatar-header cursor-pointer" onClick={() => setSelectedContact(!selectedContact)}>
                  <div className="avatar headavatar">
                    {selectedContact.name?.[0]?.toUpperCase() || selectedContact.phone_number?.[0]}
                  </div>
                  <div>
                    <div className="chat-name">{selectedContact.name || selectedContact.phone_number}</div>
                    <div className="status">Online</div>
                  </div>
                </div>
              </div>
              <div className="search relative">
                <div className="cursor-pointer relative">
                  <SearchIcon
                    className="text-white hover:text-gray-600"
                    width={20}
                    onClick={() => setSearchActive(!searchActive)}
                  />
                  {searchActive && (
                    <div className="absolute top-10 right-0 w-72 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-20 flex items-center">
                      <input
                        type="text"
                        placeholder="Search within chat"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="flex-1 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none"
                      />
                      {searchText && (
                        <X
                          size={20}
                          className="text-gray-500 hover:text-red-500 cursor-pointer mr-2"
                          onClick={() => {
                            setSearchText("");
                            setSearchActive(false);
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </ChatHeader>
  
            <Messages className="relative">
              {messages.map((msg, idx) => (
                <div
                  key={msg._id || idx}
                  className={`message ${msg.from === user.phone_number ? "sent" : "received"}`}
                >
                  {msg.text}
                  <div className="timestamp">
                    {dayjs(msg.timestamp).format("hh:mm A")}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </Messages>
  
            <MessageInput className="flex items-center gap-2 relative">
              <div className="relative">
                <SmileIcon
                  className="cursor-pointer text-center hover:text-green-700"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                {showEmojiPicker && (
                  <div className="absolute bottom-12 left-0 z-50">
                    <Picker data={data} onSelect={handleEmojiSelect} />
                  </div>
                )}
              </div>
              <div className="relative">
                <Paperclip
                  className="cursor-pointer text-center hover:text-green-700"
                  onClick={() => setShowMenu(!showMenu)}
                />
                {showMenu && (
                  <div className="absolute bottom-12 left-0 stak mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md z-50">
                    <ul className="py-2 text-sm text-gray-700">
                      <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Image size={16} className="mr-2" /> Photos & videos
                      </li>
                      <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Camera size={16} className="mr-2" /> Camera
                      </li>
                      <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <FileText size={16} className="mr-2" /> Document
                      </li>
                      <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <User size={16} className="mr-2" /> Contact
                      </li>
                      <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                setShowTemplates(true);  // Show templates modal
                fetchTemplates();        // Fetch templates from backend
              }}>
                        <LayoutPanelTop size={16} className="mr-2" /> Templates
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <input
                className="flex-1 px-3 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#4caf50]"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-green-700 text-white hover:bg-green-400"
                onClick={handleSendMessage}
              >
                {newMessage.trim() ? <Send size={20} /> : <Mic size={20} />}
              </button>
            </MessageInput>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a contact to start chatting
          </div>
        )}
      </ChatArea>

      {showTemplates && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg w-96">
      <h2 className="text-lg font-semibold mb-4">Select a Template</h2>
      <div className="max-h-60 overflow-y-auto border rounded p-2">
        {Array.isArray(templates) && templates.length > 0 ? (
          templates.map((template, index) => (
            <div
              key={index}
              className={`p-2 border-b cursor-pointer ${
                selectedTemplate === template ? "bg-green-200" : ""
              }`}
              onClick={() => setSelectedTemplate(template)}
            >
              {template.name}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No templates available</p>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded mr-2"
          onClick={() => setShowTemplates(false)}
        >
          Cancel
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedTemplate ? "bg-green-500 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          onClick={async () => {
            if (selectedTemplate) {
              await sendTemplate(selectedTemplate); // Call updated sendTemplate function
              setShowTemplates(false);
            }
          }}
          disabled={!selectedTemplate}
        >
          Send
        </button>
      </div>
    </div>
  </div>
)}

  
      {selectedContact && (
        <ChatProfile>
          <ProfileContainer>
          <ProfileHeader>
            <div className="flex justify-between mb-6">
              <div className="profile-info">
                <div className="avatar">
                  {selectedContact?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <h2 className="contact-name">
                    {selectedContact?.name || "Select a contact"}
                  </h2>
                  <p className="contact-phone">
                    {selectedContact?.phone_number || ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center h-fit py-2 px-4 text-sm font-medium text-white bg-red-500 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-600">
                <BanIcon className="icon mr-1" /> Block
              </div>
            </div>

            <Tabs>
              <Tab
                className={activeTab === "Profile" ? "active" : ""}
                onClick={() => setActiveTab("Profile")}
              >
                Profile
              </Tab>
              <Tab
                className={activeTab === "Assisted Sales" ? "active" : ""}
                onClick={() => setActiveTab("Assisted Sales")}
              >
                Assisted Sales
              </Tab>
            </Tabs>
          </ProfileHeader>

          {activeTab === "Profile" && (
            <>
              <OrderSummary>
                <OrderSummaryCard>
                  <OrderSummaryTitle>Orders</OrderSummaryTitle>
                  <OrderSummaryValue>12</OrderSummaryValue>
                </OrderSummaryCard>
              </OrderSummary>

              <LastOrder>
                <LastOrderHeader>
                  <LastOrderId>#12345</LastOrderId>
                  <SearchButton>View</SearchButton>
                </LastOrderHeader>
                <LastOrderStatus>
                  <StatusTag>Delivered</StatusTag>
                  <OrderDate>12 Aug 2024</OrderDate>
                </LastOrderStatus>
                <LastOrderFooter>
                  <OrderTotal>$120</OrderTotal>
                  <DetailsButton>Details</DetailsButton>
                </LastOrderFooter>
              </LastOrder>

              <WooCommerceNotes>
                <NotesTabs>
                  <NotesTab>Public Notes</NotesTab>
                  <NotesTab>Private Notes</NotesTab>
                </NotesTabs>
                <NotesContent>
                  <Note>
                    <NoteLabel>Note 1</NoteLabel>
                    <NoteInfo>
                      <NoteValue>Updated on 10th Aug</NoteValue>
                      <EditNote>Edit</EditNote>
                    </NoteInfo>
                  </Note>
                </NotesContent>
              </WooCommerceNotes>
            </>
          )}

          {activeTab === "Assisted Sales" && <div className="assisted-sales">Sales Data</div>}
        </ProfileContainer>
        </ChatProfile>
      )}
    </Container>
  );
};

export default ChatApp;