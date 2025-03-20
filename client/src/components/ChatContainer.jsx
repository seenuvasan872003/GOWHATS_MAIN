import React, { useState, useEffect, useRef } from "react";
import { io } from 'socket.io-client';
import api from '../utils/axios';
import styled from "styled-components";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import { BanIcon, ChevronDownIcon, EditIcon, SearchIcon, Mic, Send, SmileIcon, Search, X, Trash2, Pencil, Check,  ArrowLeft } from "lucide-react"; // Imported icons
import { Paperclip, Image, Camera, FileText, User, BotIcon, UserIcon, Wallet, Landmark, ListFilter, LayoutPanelTop, } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import RatingStars from "./LastOrder/RatingStars";
import { useAuth } from "../context/AuthContext"; 
import { sendTemplateMessage } from '../services/messageService';

// Styled Components
const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #f8f9fa;
`;

const Sidebar = styled.div`
  
  background: #ffffff;
  border-right: 1px solid #ddd;
  
`;

const SearchBar = styled.input`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
  width: calc(100% - 20px);
`;

const ContactList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ContactItem = styled.div`
  position: relative;
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
  flex-direction: column;
  background-color: #f0f0f0; /* Lighter background */
  position: relative;
  height: 100%;
  overflow: hidden !important;
  
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
      width: 50px;
      height: 50px;
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
  display: flex;
  flex-direction: column;
  gap: 8px;


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

const MessageBubble = styled.div`
  max-width: 65%;
  padding: 8px 12px;
  border-radius: 8px;
  word-wrap: break-word;
  font-size: 14px;
  margin: 4px 0;
  align-self: ${props => props.$sent ? 'flex-end' : 'flex-start'};
  background: ${props => props.$sent ? '#dcf8c6' : '#ffffff'};
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);

  &.sent {
    margin-left: auto;
    background: #dcf8c6;
  }

  &.received {
    margin-right: auto;
    background: #ffffff;
  }

  .timestamp {
    font-size: 11px;
    color: #888;
    text-align: right;
    margin-top: 2px;
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


const ProfileContainer = styled.div`
  padding: 16px;
`;

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
    width: 50px;
    height: 50px;
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

const NotificationBubble = styled.div`
  background-color: #25D366;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  position: absolute;
  right: 10px;
  bottom: 15px;
  min-width: 20px;
  text-align: center;
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
  const [unreadCounts, setUnreadCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const [showTemplates, setShowTemplates] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

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
 
  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };
 
  const handleEdit = (field) => {
    setEditingField(field);
  };
 
  const handleSave = () => {
    setEditingField(null);
  };
 
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
    if (!selectedContact || !user) return;
  
    const loadMessages = async () => {
      try {
        const response = await api.get('/api/messages', {
          params: { 
            phone_number: selectedContact.phone_number,
            sort: '-timestamp' 
          }
        });
  
        if (response.data) {
          setMessages(response.data);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
  
    loadMessages();
  }, [selectedContact, user]);
 
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
 
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact) return;
  
    const messageText = newMessage.trim();
    setNewMessage("");
  
    const tempMessage = {
      text: messageText,
      timestamp: new Date(),
      from: selectedContact.phone_number === user.phone_number ? user.phone_number : 'me',
      _id: Date.now().toString()
    };
  
    setMessages(prev => [...prev, tempMessage]);
  
    try {
      const response = await api.post("/api/messages/send", {
        to: selectedContact.phone_number,
        text: messageText
      });
  
      if (response.data?.message) {
        setMessages(prev => 
          prev.map(msg => 
            msg._id === tempMessage._id ? {
              ...response.data.message,
              from: 'me' // Mark as sent by current user
            } : msg
          )
        );
      }
    } catch (error) {
      setMessages(prev => prev.filter(msg => msg._id !== tempMessage._id));
      toast.error("Failed to send message");
    }
  };
 
  const handleContactSelect = async (contact) => {
    setSelectedContact(contact);
    setShowProfile(false); // Reset profile view when selecting a new contact
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


  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleBackToChat = () => {
    setShowProfile(false);
  };

  const handleBackToContacts = () => {
    setSelectedContact(null);
    setShowProfile(false);
  };

 
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
 
  
    

  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedContact]);
  const ChatContainer = ({ contacts, selectedContact, handleContactSelect }) => {
    // State for search query
    const [searchQuery, setSearchQuery] = useState("");
  
    // Filter contacts based on search input
    const filteredContacts = contacts?.filter((contact) =>
      (contact.profile_name || contact.name || contact.phone_number)
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }
  
  
if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
    </div>
  );
};
  return (
    <Container className="flex">
    <Sidebar className={`w-full md:w-80 bg-white border-r border-gray-200 ${selectedContact ? 'hidden md:block' : 'block'}`}>
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
  
  
      <ChatArea className={`flex-1 flex flex-col ${!selectedContact ? 'hidden md:flex' : showProfile ? 'hidden' : 'flex'}`}>
        {selectedContact ? (
          <>
            <ChatHeader >
              <div className="header-details align-middle justify-center relative">
                <div className="flex items-center"> 
                  <ArrowLeft 
                    size={20}
                    className="mr-4 cursor-pointer md:hidden align-middle" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBackToContacts();
                    }}
                  />
                </div>
                <div className="avatar-header cursor-pointer" onClick={() => toggleProfile()} > {/*onClick={() => setSelectedContact(!selectedContact)} */}
                  <div className="headavatar flex items-center justify-center text-white text-xl font-bold rounded-full bg-[#16a34a] ">   
                    {selectedContact.name?.[0]?.toUpperCase() || selectedContact.phone_number?.[0]}
                  </div>
                  <div>
                    <div className="chat-name">{selectedContact.name || selectedContact.phone_number}</div>
                    <div className="status">Online</div>
                  </div>
                </div>
              </div>
              <div className="search relative">
                <div className="cursor-pointer relative pr-3">
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
  
            <Messages>
  {messages.reduce((acc, msg, idx) => {
    const msgDate = dayjs(msg.timestamp).format("YYYY-MM-DD");
    const prevMsgDate = idx > 0 ? dayjs(messages[idx - 1].timestamp).format("YYYY-MM-DD") : null;

    if (msgDate !== prevMsgDate) {
      acc.push(
        <div key={msgDate} className="text-center text-gray-500 my-3 text-sm">
          {dayjs(msgDate).format("dddd, MMM D, YYYY")}
        </div>
      );
    }

    acc.push(
      <MessageBubble
        key={msg._id || idx}
        $sent={msg.from === selectedContact?.phone_number ? false : true}
        className={msg.from === selectedContact?.phone_number ? 'received' : 'sent'}
      >
        {msg.text}
        <div className="text-xs text-gray-500 text-right mt-1">
          {dayjs(msg.timestamp).format("hh:mm A")}
        </div>
      </MessageBubble>
    );

    return acc;
  }, [])}
  <div ref={messagesEndRef} />
</Messages>

<MessageInput className="flex items-center gap-2 relative"></MessageInput>
            <MessageInput className="flex items-center gap-2 relative">
              <div className="relative">
                <SmileIcon
                  className="cursor-pointer text-center hover:text-green-700"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                {showEmojiPicker && (
                  <div className="absolute bottom-12 left-0 z-50 ">
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
        <ChatProfile className={`w-full md:w-[450px] bg-white border-l border-gray-200 overflow-y-auto ${showTemplates ? 'hidden' : showProfile ? 'block' : 'hidden md:block'}`} >
          {/* Mobile back button */}
          <div className=" bg-[#4caf50] text-white p-4 flex items-center sticky top-0 z-10">
            <ArrowLeft 
              className="mr-2 cursor-pointer" 
              onClick={handleBackToChat}
            />
            <span>Profile</span>
          </div>
        <ProfileContainer>
          {/* Profile Header and Information */}
          <ProfileHeader >
            <div className="flex justify-between mb-6 ">
              <div className="profile-info">
                {/* Avatar: Display first letter of the contact's name */}
                <div className="md:h-14 md:w-14 h-10 w-10 bg-[#4caf50] flex items-center justify-center text-white text-2xl font-bold rounded-full">
                {selectedContact.name?.[0]?.toUpperCase() || selectedContact.phone_number?.[0]}
                </div>
                <div>
                  {/* Contact Name */}
                  <h2 className="contact-name">
                    {selectedContact ? selectedContact.name : 'Select a contact'}
                  </h2>
                  {/* Contact Phone Number */}
                  <p className="contact-phone font-medium text-4xl">
                    {selectedContact ? selectedContact.phone_number : ''}
                  </p>
                </div>
              </div>
              {/* Block Button */}
              <div className="flex items-center h-fit py-2 px-4 text-sm font-medium text-white bg-red-500 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-600">
                <BanIcon className="icon mr-1 md:size-6 size-4" />
                Block
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs sm:flex space-x-4 bg-gray-100 p-2 rounded-lg w-fit mx-auto justify-center text-center">
              <button
                className={`w-40 px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 mb-3 sm:mb-0 ml-4 
              ${activeTab === "Profile"
                    ? "bg-green-600 text-white shadow-lg scale-105"
                    : "bg-white text-green-700 border border-green-400 hover:bg-green-50"
                  }`}
                onClick={() => setActiveTab("Profile")}
              >
                Profile
              </button>

              <button
                className={`w-40 px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 
              ${activeTab === "Assisted Sales"
                    ? "bg-green-600 text-white shadow-lg scale-105"
                    : "bg-white text-green-700 border border-green-400 hover:bg-green-50"
                  }`}
                onClick={() => setActiveTab("Assisted Sales")}
              >
                Assisted Sales
              </button>
            </div>
          </ProfileHeader>

          {/* Profile Tab Content */}
          {activeTab === "Profile" && (
            <>
              {/* Order Summary Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className=" border-[#e5e7eb] rounded-2xl shadow-md border-solid p-4">
                  <h3 className="text-sm font-medium mb-2">Orders Count</h3>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className=" border-[#e5e7eb] rounded-2xl shadow-md border-solid p-4">
                  <h3 className="text-sm font-medium mb-2">Total Order Value</h3>
                  <p className="text-2xl font-bold">₹50k</p>
                </div>
                <div className=" border-[#e5e7eb] rounded-2xl shadow-md border-solid p-4">
                  <div className="wallet-header flex gap-2 items-center justify-between">
                    <h3 className="text-sm font-medium mb-2">Wallet</h3>
                    <button className="edit-button relative">
                      <EditIcon size={18} className="icon" onClick={() => setShowWallet(!showWallet)} />
                      {showWallet && (
                        <div className="absolute bottom-10 -left-40 stak  mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md z-50">
                          <ul className="py-2 text-sm text-gray-700">
                            <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-green-500 hover:text-white">
                              <Wallet size={16} className="mr-2" /> Add Money
                            </li>
                            <li className="flex items-center px-4 py-2 hover:bg-green-500 hover:text-white cursor-pointer">
                              <Landmark size={16} className="mr-2" /> withdraw
                            </li>
                          </ul>
                        </div>
                      )}
                    </button>
                  </div>
                  <p className="text-2xl font-bold">₹0</p>
                </div>
              </div>

              {/* Last Order */}
              <div className="last-order overflow-auto max-h-90 relative">

                <div className=" mb-4 sticky top-0 z-10 bg-white">
                  <h1 className="font-bold mb-2">My Orders</h1>
                  <div className="flex gap-6 items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4caf50]"
                        placeholder="Search order"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <ListFilter className="icon" />
                      <p>Filters</p>
                    </div>
                  </div>
                </div>
                <div className="flex-col gap-2.5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {/* <div className="h-20 w-20 bg-amber-300">1</div> */}
                      <img src="https://m.media-amazon.com/images/I/61YsjBvrKmL._AC_UF1000,1000_QL80_.jpg" className="-20 w-20" alt="" />
                    </div>
                    <div>
                      <span className="block product-name">POCO X7 Pro 5G</span>
                      <span className="order-date block">Delivered on Jan 3,2025</span>
                      <RatingStars rating={4} />  {/* Replace 'FULFILLED' with a 4-star rating */}
                    </div>
                    <div>
                      <ChevronDownIcon className="icon" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScjD1Cw_N6FsbkMk2ihlD3xIto_eyvg4QexQ&s" className="-20 w-20" alt="" />
                    </div>
                    <div>
                      <span className="block product-name">Fire-Boltt Smartwatch</span>
                      <span className="order-date block">Delivered on nov 30,2024</span>
                      <RatingStars rating={3} />
                    </div>
                    <div>
                      <ChevronDownIcon className="icon" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxZ-yh5pgiE4k8TP75SXdYXgRG7GYuvxSY1g&s" className="-20 w-20" alt="" />
                    </div>
                    <div>
                      <span className="block product-name">Back Cover for POCO X3</span>
                      <span className="order-date block">Delivered on feb 20,2024</span>
                      <RatingStars rating={2} />
                    </div>
                    <div>
                      <ChevronDownIcon className="icon" />
                    </div>
                  </div>
                </div>
              </div>

              {/* WooCommerce Notes */}
              <div className="p-4 border border-gray-300 rounded-lg shadow-md">
                <div className="border-b border-gray-300 mb-4 sm:flex space-x-4 bg-gray-100 p-2 rounded-lg w-fit mx-auto justify-center text-center">
                  {/* <button className="notes-tab">Address</button>
                  <button className="notes-tab">Note</button> */}
                  <button
                    className={`w-40 px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 mb-3 sm:mb-0 ml-4
              ${activetab === "Address"
                        ? "bg-green-600 text-white shadow-lg scale-105"
                        : "bg-white text-green-700 border border-green-400 hover:bg-green-50"
                      }`}
                    onClick={() => setactivetab("Address")}
                  >
                    Address
                  </button>

                  <button
                    className={`w-40 px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 
              ${activetab === "Note"
                        ? "bg-green-600 text-white shadow-lg scale-105"
                        : "bg-white text-green-700 border border-green-400 hover:bg-green-50"
                      }`}
                    onClick={() => setactivetab("Note")}
                  >
                    Note
                  </button>
                </div>
                {/* Address */}
                {activetab === "Address" && (
                  <>
                    <div className="flex-col gap-4 space-y-4">
                      <div className="note flex flex-col">
                        <span className="note-label font-bold">Email Address</span>
                        <div className="note-info flex justify-between items-center">
                          {editingField === "email" ? (
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="border p-1 rounded w-full"
                            />
                          ) : (
                            <span className="note-value">{email}</span>
                          )}
                          {editingField === "email" ? (
                            <button className="ml-2 bg-green-500 text-white px-2 py-1 rounded" onClick={handleSave}>Save</button>
                          ) : (
                            <button className="edit-note ml-2 text-blue-500" onClick={() => handleEdit("email")}>Edit</button>
                          )}
                        </div>
                      </div>
                      <div className="note flex flex-col">
                        <span className="note-label font-bold">Address</span>
                        <div className="note-info flex justify-between items-center">
                          {editingField === "address" ? (
                            <input
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="border p-1 rounded w-full"
                            />
                          ) : (
                            <span className="note-value">{address}</span>
                          )}
                          {editingField === "address" ? (
                            <button className="ml-2 bg-green-500 text-white px-2 py-1 rounded" onClick={handleSave}>Save</button>
                          ) : (
                            <button className="edit-note ml-2 text-blue-500" onClick={() => handleEdit("address")}>Edit</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {/* Note */}
                {activetab === "Note" && (
                  <>
                    <div className="notes-section">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="Write a note..."
                      />
                      <button
                        className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                        onClick={handleAddNote}
                      >
                        Add Note
                      </button>
                      <div className="notes-list mt-4">
                        {notes.length > 0 ? (
                          notes.map((note, index) => (
                            <div
                              key={index}
                              className="note-item flex justify-between items-center bg-gray-200 p-2 rounded mb-2"
                            >
                              {editingIndex === index ? (
                                <input
                                  type="text"
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  className="border p-1 rounded w-full mr-2"
                                />
                              ) : (
                                <span>{note}</span>
                              )}

                              <div className="flex space-x-2">
                                {editingIndex === index ? (
                                  <button
                                    className="bg-green-500 text-white p-1 rounded"
                                    onClick={() => handleSaveEdit(index)}
                                  >
                                    <Check size={18} />
                                  </button>
                                ) : (
                                  <button
                                    className="text-green-500 p-1"
                                    onClick={() => handleEditNote(index)}
                                  >
                                    <Pencil size={18} />
                                  </button>
                                )}
                                <button
                                  className="text-red-500 p-1"
                                  onClick={() => handleDeleteNote(index)}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No notes yet. Start by adding one!</p>
                        )}
                      </div>
                    </div>

                  </>
                )}

              </div>
            </>
          )}

          {/* Assisted Sales Tab Content */}
          {activeTab === "Assisted Sales" && (
            <div className="assisted-sales">
              <div className="flex justify-center gap-6">
                <p className="text-sm font-semibold">Chatbot Assistance</p>
                <div
                  className={`relative flex items-center w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-500 ${isChatbot ? "justify-start bg-gray-200" : "justify-end bg-green-400"
                    }`}
                  onClick={() => {
                    toggleMode();
                    setAssistedSalesMode(isChatbot ? "Human" : "Chatbot");
                  }}
                >
                  {/* Toggle Ball */}
                  <div className="w-6 h-6 bg-green-700 rounded-full shadow-md flex items-center justify-center transition-all duration-1000">
                    {isChatbot ? (
                      <BotIcon className="w-4 h-4 text-white" onClick={() => setAssistedSalesMode("Chatbot")} />
                    ) : (
                      <UserIcon className="w-4 h-4 text-white" onClick={() => setAssistedSalesMode("Human")} />
                    )}
                  </div>
                </div>
                <p className="text-sm font-semibold">Human Assistance</p>
              </div>

              {/* Chatbot Mode */}
              {assistedSalesMode === "Chatbot" && (
                <div className="chatbot-content">
                  <h3 className="text-center">Chatbot Assistance</h3>
                  <p>AI-powered chatbot available for quick assistance.</p>
                </div>
              )}

              {/* Human Mode */}
              {assistedSalesMode === "Human" && (
                <div className="human-content">
                  <h3 className="text-center">Human Assistance</h3>
                  <p>Connecting to a sales representative...</p>
                </div>
              )}
            </div>
          )}

        </ProfileContainer>
      </ChatProfile>
      )}
    </Container>
  );
};

export default ChatApp;