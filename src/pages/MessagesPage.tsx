import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  Image as ImageIcon, 
  CheckCheck, 
  Check, 
  ShieldCheck, 
  Calendar,
  X
} from 'lucide-react';
import { Conversation, ChatMessage, UserProfile } from '../types';

interface MessagesPageProps {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  messages: Record<string, ChatMessage[]>;
  onSendMessage: (conversationId: string, content: string, attachmentUrl?: string) => void;
  currentUser: UserProfile | null;
  onBookTechnician?: () => void;
}

export const MessagesPage: React.FC<MessagesPageProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  messages,
  onSendMessage,
  currentUser,
  onBookTechnician,
}) => {
  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(null);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const activeMessages = activeConv ? (messages[activeConv.id] || []) : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !attachmentPreview) return;
    if (!activeConv) return;

    onSendMessage(activeConv.id, inputText.trim(), attachmentPreview || undefined);
    setInputText('');
    setAttachmentPreview(null);
  };

  const simulateAttachment = () => {
    // Attach sample repair photo
    setAttachmentPreview('/src/assets/images/hero_technician_repair_1794306643365.jpg');
  };

  const filteredConversations = conversations.filter(c => 
    c.participant_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <div className="bg-white dark:bg-[#0D1829] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden h-[750px] flex flex-col md:flex-row transition-colors">
        
        {/* Left Column: Conversation Directory */}
        <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/40">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1829]">
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              FixNaija Direct Chat
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              End-to-end encrypted discussion & quotes
            </p>

            {/* Search */}
            <div className="mt-3 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConv?.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-white dark:bg-slate-800/80 border-l-4 border-[#FF6500] shadow-xs' 
                      : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.participant_avatar}
                      alt={conv.participant_name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
                    />
                    {conv.is_online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-[#0D1829] rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {conv.participant_name}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                        {conv.last_message_time}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#FF6500] font-medium truncate mt-0.5">
                      {conv.category}
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">
                      {conv.last_message}
                    </p>
                  </div>

                  {conv.unread_count > 0 && (
                    <span className="w-5 h-5 bg-[#FF6500] text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0 mt-1">
                      {conv.unread_count}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-100/60 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400">
              Only accessible by authorized participants via Supabase RLS
            </span>
          </div>

        </div>

        {/* Right Column: Active Chat Thread */}
        {activeConv ? (
          <div className="flex-1 flex flex-col bg-white dark:bg-[#0D1829]">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeConv.participant_avatar}
                  alt={activeConv.participant_name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{activeConv.participant_name}</h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{activeConv.participant_title} · {activeConv.category}</p>
                </div>
              </div>

              {onBookTechnician && (
                <button
                  onClick={onBookTechnician}
                  className="px-3.5 py-1.5 bg-[#FF6500] hover:bg-[#e05900] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Service</span>
                </button>
              )}
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-slate-900/20">
              {activeMessages.map((msg) => {
                const isMe = msg.sender_id === (currentUser?.id || 'user-current');

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isMe
                          ? 'bg-[#0B192C] dark:bg-[#FF6500] text-white rounded-tr-none'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-tl-none'
                      }`}
                    >
                      {msg.attachment_url && (
                        <div className="mb-2 rounded-xl overflow-hidden border border-white/10">
                          <img
                            src={msg.attachment_url}
                            alt="Attachment"
                            className="max-h-48 w-full object-cover"
                          />
                        </div>
                      )}
                      <p>{msg.content}</p>
                    </div>

                    <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {isMe && (
                        <span>
                          {msg.status === 'read' ? (
                            <CheckCheck className="w-3.5 h-3.5 text-[#FF6500] dark:text-amber-400 inline" />
                          ) : (
                            <Check className="w-3.5 h-3.5 inline" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Attachment preview if user picked an image */}
            {attachmentPreview && (
              <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={attachmentPreview}
                    alt="Preview"
                    className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Photo attached for diagnostic analysis</span>
                </div>
                <button
                  onClick={() => setAttachmentPreview(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={simulateAttachment}
                title="Attach Photo of Damaged Equipment"
                className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-[#0B192C] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                <ImageIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message, ask for diagnostic quote..."
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800"
              />

              <button
                type="submit"
                disabled={!inputText.trim() && !attachmentPreview}
                className="p-2.5 bg-[#FF6500] hover:bg-[#e05900] disabled:opacity-40 text-white rounded-xl shadow-xs transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
            Select a conversation on the left to start chatting.
          </div>
        )}

      </div>

    </div>
  );
};
