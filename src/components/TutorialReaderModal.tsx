import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  Play, 
  Lightbulb, 
  Send, 
  Clock, 
  Eye, 
  ShieldCheck
} from 'lucide-react';
import { Tutorial, UserProfile } from '../types';

interface TutorialReaderModalProps {
  tutorial: Tutorial | null;
  currentUser: UserProfile | null;
  onClose: () => void;
  onPromptAuth: () => void;
}

export const TutorialReaderModal: React.FC<TutorialReaderModalProps> = ({
  tutorial,
  currentUser,
  onClose,
  onPromptAuth,
}) => {
  const [liked, setLiked] = useState(tutorial?.is_liked || false);
  const [likesCount, setLikesCount] = useState(tutorial?.likes_count || 0);
  const [saved, setSaved] = useState(tutorial?.is_saved || false);
  const [following, setFollowing] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(tutorial?.comments || []);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!tutorial) return null;

  const toggleLike = () => {
    if (!currentUser) {
      onPromptAuth();
      return;
    }
    if (liked) {
      setLiked(false);
      setLikesCount(prev => Math.max(0, prev - 1));
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const toggleSave = () => {
    if (!currentUser) {
      onPromptAuth();
      return;
    }
    setSaved(!saved);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onPromptAuth();
      return;
    }
    if (!commentText.trim()) return;

    const newComment = {
      id: 'comm-' + Date.now().toString(),
      user_name: currentUser.full_name,
      content: commentText.trim(),
      created_at: 'Just now',
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#0D1829] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150 transition-colors">
        
        {/* Top bar with author */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={tutorial.author.avatar_url}
              alt={tutorial.author.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{tutorial.author.name}</span>
                {tutorial.author.verified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{tutorial.author.title}</p>
            </div>
            
            <button
              onClick={() => {
                if (!currentUser) {
                  onPromptAuth();
                  return;
                }
                setFollowing(!following);
              }}
              className={`ml-2 px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                following 
                  ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300' 
                  : 'bg-white dark:bg-slate-800 border-[#0B192C] dark:border-[#FF6500] text-[#0B192C] dark:text-[#FF6500] hover:bg-slate-50 dark:hover:bg-slate-750'
              }`}
            >
              {following ? 'Following' : '+ Follow'}
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              title="Share Tutorial"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-7 right-0 text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded whitespace-nowrap">
                  Link copied!
                </span>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Metadata line without pills */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="text-[#FF6500] font-bold uppercase tracking-wider">{tutorial.category}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{tutorial.type} Tutorial</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {tutorial.read_time}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {tutorial.views_count.toLocaleString()} views
            </span>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B192C] dark:text-white leading-snug tracking-tight">
            {tutorial.title}
          </h1>

          {/* Media Header: Video or Cover Image */}
          {tutorial.type === 'video' ? (
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video shadow-md">
              <img
                src={tutorial.cover_image}
                alt={tutorial.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FF6500] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <p className="text-white text-xs font-semibold mt-3 bg-black/60 px-3 py-1 rounded-full">
                  Click to Stream 1080p Masterclass ({tutorial.read_time})
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden aspect-[21/9] bg-slate-100 dark:bg-slate-800 shadow-sm">
              <img
                src={tutorial.cover_image}
                alt={tutorial.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt and Intro Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
            <p className="text-base font-medium text-slate-900 dark:text-white border-l-2 border-[#FF6500] pl-3 py-0.5">
              {tutorial.excerpt}
            </p>
            {tutorial.content && (
              <p className="whitespace-pre-line">{tutorial.content}</p>
            )}
          </div>

          {/* Step-by-Step Breakdown if present */}
          {tutorial.steps && tutorial.steps.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Step-by-Step Practical Troubleshooting Instructions
              </h3>

              <div className="space-y-4">
                {tutorial.steps.map((st) => (
                  <div 
                    key={st.step}
                    className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-lg bg-[#0B192C] dark:bg-[#FF6500] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {st.step}
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {st.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {st.detail}
                        </p>
                        {st.tip && (
                          <div className="mt-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800 flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span><strong>Pro-Tip:</strong> {st.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engagement Strip */}
          <div className="py-4 border-y border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLike}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  liked 
                    ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-rose-600' : ''}`} />
                <span className="tabular-nums">{likesCount} Likes</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <span className="tabular-nums">{comments.length} Comments</span>
              </div>
            </div>

            <button
              onClick={toggleSave}
              className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                saved ? 'text-[#FF6500] bg-orange-50 dark:bg-orange-950/40' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#FF6500]' : ''}`} />
              <span>{saved ? 'Saved' : 'Save Guide'}</span>
            </button>
          </div>

          {/* Comments Discussion Section */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Community Discussion ({comments.length})
            </h4>

            {/* Post comment input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Ask a technical question or add your insight..."
                className="flex-1 px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6500] focus:bg-white dark:focus:bg-slate-800"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#0B192C] dark:bg-[#FF6500] hover:bg-[#071322] dark:hover:bg-[#e05900] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>

            {/* Comments list */}
            <div className="space-y-3 pt-2">
              {comments.map((comm) => (
                <div key={comm.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">{comm.user_name}</span>
                    <span className="text-[11px] text-slate-400">{comm.created_at}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {comm.content}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
