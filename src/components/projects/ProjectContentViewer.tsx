import React, { useState } from 'react';
import { FileText, Calendar, User, Eye, BookOpen, FileIcon, Clipboard, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProjectContent } from '../../types/project';

interface ProjectContentViewerProps {
  content: ProjectContent[];
}

const ProjectContentViewer: React.FC<ProjectContentViewerProps> = ({ content }) => {
  const [expandedContent, setExpandedContent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const publishedContent = content.filter(item => item.is_published);
  
  const contentTypes = [
    { value: 'all', label: 'All Content', icon: FileText },
    { value: 'article', label: 'Articles', icon: BookOpen },
    { value: 'documentation', label: 'Documentation', icon: FileIcon },
    { value: 'report', label: 'Reports', icon: Clipboard },
    { value: 'overview', label: 'Overview', icon: Eye }
  ];

  const filteredContent = activeTab === 'all' 
    ? publishedContent 
    : publishedContent.filter(item => item.content_type === activeTab);

  const getContentTypeColor = (type: ProjectContent['content_type']) => {
    const colors = {
      article: 'bg-blue-100 text-blue-800 border-blue-200',
      documentation: 'bg-green-100 text-green-800 border-green-200',
      report: 'bg-purple-100 text-purple-800 border-purple-200',
      overview: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type];
  };

  const toggleExpanded = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (publishedContent.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-3 text-blue-600" />
          Project Content
        </h2>

        {/* Content Type Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {contentTypes.map((type) => {
            const IconComponent = type.icon;
            const count = type.value === 'all' 
              ? publishedContent.length 
              : publishedContent.filter(item => item.content_type === type.value).length;
            
            if (count === 0 && type.value !== 'all') return null;
            
            return (
              <button
                key={type.value}
                onClick={() => setActiveTab(type.value)}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === type.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {type.label}
                {count > 0 && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === type.value
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content List */}
        <div className="space-y-6">
          {filteredContent
            .sort((a, b) => a.order_index - b.order_index)
            .map((item) => {
              const isExpanded = expandedContent === item.id;
              const previewLength = 300;
              const needsExpansion = item.content.length > previewLength;
              
              return (
                <article
                  key={item.id}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 leading-tight">
                            {item.title}
                          </h3>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getContentTypeColor(item.content_type)}`}>
                            {contentTypes.find(t => t.value === item.content_type)?.label}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          {item.author && (
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>By {item.author}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(item.updated_at)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{item.content.length.toLocaleString()} characters</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-gray max-w-none">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {isExpanded || !needsExpansion
                          ? item.content
                          : `${item.content.substring(0, previewLength)}...`
                        }
                      </div>
                    </div>

                    {/* Expand/Collapse Button */}
                    {needsExpansion && (
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => toggleExpanded(item.id)}
                          className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-2 group-hover:translate-y-1 transition-transform" />
                              Read More
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Available</h3>
            <p className="text-gray-600">
              {activeTab === 'all' 
                ? 'No published content is available for this project yet.'
                : `No ${contentTypes.find(t => t.value === activeTab)?.label.toLowerCase()} content is available.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectContentViewer;