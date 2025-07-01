import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, FileText, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import type { ProjectContent } from '../../types/project';
import { fetchProjectContent, createProjectContent, updateProjectContent, deleteProjectContent } from '../../lib/projectsApi';

interface ProjectContentEditorProps {
  projectId: string;
  content: ProjectContent[];
  onContentUpdate: (content: ProjectContent[]) => void;
}

const ProjectContentEditor: React.FC<ProjectContentEditorProps> = ({
  projectId,
  content,
  onContentUpdate
}) => {
  const [editingContent, setEditingContent] = useState<ProjectContent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    content_type: 'article' as ProjectContent['content_type'],
    is_published: true,
    author: '',
    order_index: 0
  });

  const contentTypes = [
    { value: 'article', label: 'Article', description: 'General article or blog post' },
    { value: 'documentation', label: 'Documentation', description: 'Technical documentation' },
    { value: 'report', label: 'Report', description: 'Formal report or study' },
    { value: 'overview', label: 'Overview', description: 'Project overview or summary' }
  ];

  useEffect(() => {
    if (projectId && projectId !== 'new') {
      fetchProjectContent(projectId).then(res => {
        if (res.data) onContentUpdate(res.data);
      });
    }
    // eslint-disable-next-line
  }, [projectId]);

  const resetForm = () => {
      setEditingContent(null);
      setFormData({
        title: '',
        content: '',
        content_type: 'article',
        is_published: true,
        author: '',
        order_index: content.length
      });
  };

  const handleEdit = (contentItem: ProjectContent) => {
    setEditingContent(contentItem);
    setFormData({
      title: contentItem.title,
      content: contentItem.content,
      content_type: contentItem.content_type,
      is_published: contentItem.is_published,
      author: contentItem.author || '',
      order_index: contentItem.order_index
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      content: formData.content,
      contentType: formData.content_type,
      orderIndex: formData.order_index,
      isPublished: formData.is_published,
      author: formData.author
    };
    if (editingContent && editingContent.id && !editingContent.id.startsWith('temp-')) {
      // Update
      const res = await updateProjectContent(editingContent.id, payload);
      if (res.data) {
        const updatedContent = content.map(item => item.id === editingContent.id ? res.data : item);
        onContentUpdate(updatedContent);
      }
    } else {
      // Create
      const res = await createProjectContent(projectId, payload);
      if (res.data) {
        onContentUpdate([...content, res.data]);
      }
    }
    resetForm();
  };

  const handleDelete = async (contentId: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;
    const res = await deleteProjectContent(contentId);
    if (res.data) {
    const updatedContent = content.filter(item => item.id !== contentId);
    onContentUpdate(updatedContent);
    }
    if (editingContent && editingContent.id === contentId) resetForm();
  };

  const togglePublished = async (contentId: string) => {
    const item = content.find(c => c.id === contentId);
    if (!item) return;
    const res = await updateProjectContent(contentId, { isPublished: !item.is_published });
    if (res.data) {
      const updatedContent = content.map(i => i.id === contentId ? res.data : i);
    onContentUpdate(updatedContent);
    }
  };

  const moveContent = (contentId: string, direction: 'up' | 'down') => {
    const currentIndex = content.findIndex(item => item.id === contentId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= content.length) return;

    const updatedContent = [...content];
    [updatedContent[currentIndex], updatedContent[newIndex]] = 
    [updatedContent[newIndex], updatedContent[currentIndex]];

    // Update order_index for both items
    updatedContent[currentIndex].order_index = currentIndex;
    updatedContent[newIndex].order_index = newIndex;
    updatedContent[currentIndex].updated_at = new Date().toISOString();
    updatedContent[newIndex].updated_at = new Date().toISOString();

    onContentUpdate(updatedContent);
  };

  const getContentTypeColor = (type: ProjectContent['content_type']) => {
    const colors = {
      article: 'bg-blue-100 text-blue-800 border-blue-200',
      documentation: 'bg-green-100 text-green-800 border-green-200',
      report: 'bg-purple-100 text-purple-800 border-purple-200',
      overview: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type];
  };

  return (
    <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          Project Content
        </h3>
      {/* Always-visible content form */}
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter content title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <select
              value={formData.content_type}
              onChange={(e) => setFormData(prev => ({ ...prev, content_type: e.target.value as ProjectContent['content_type'] }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {contentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Author name (optional)"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              required
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Write your content here..."
            />
            <p className="mt-2 text-sm text-gray-500">
              {formData.content.length} characters
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Publish immediately
              </span>
            </label>
            <p className="mt-1 text-sm text-gray-500">
              Unpublished content will be saved as draft
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 mt-8">
          {editingContent && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          )}
        <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
            <Save className="w-5 h-5 mr-2" />
            {editingContent ? 'Update' : 'Add'} Content
        </button>
        </div>
      </div>
      {/* Content list */}
      {content.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Content Yet</h4>
          <p className="text-gray-600 mb-4">Add articles, documentation, or reports to this project.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {content
            .sort((a, b) => a.order_index - b.order_index)
            .map((item, index) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getContentTypeColor(item.content_type)}`}>
                        {contentTypes.find(t => t.value === item.content_type)?.label}
                      </span>
                      {!item.is_published && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                          Draft
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      {item.content.length > 200 
                        ? `${item.content.substring(0, 200)}...` 
                        : item.content
                      }
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {item.author && <span>By {item.author}</span>}
                      <span>Updated {new Date(item.updated_at).toLocaleDateString()}</span>
                      <span>{item.content.length} characters</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveContent(item.id, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveContent(item.id, 'down')}
                        disabled={index === content.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => togglePublished(item.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        item.is_published
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                      title={item.is_published ? 'Published' : 'Draft'}
                    >
                      {item.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit content"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete content"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProjectContentEditor;