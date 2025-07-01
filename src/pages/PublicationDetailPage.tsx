import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  Calendar, 
  Users, 
  Tag, 
  BookOpen, 
  Quote,
  Share2,
  Mail,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle,
  Loader2,
  AlertCircle,
  Home,
  ChevronRight
} from 'lucide-react';
import Footer from '../components/Footer';
import { publicationsApi } from '../lib/apiClient';
import type { Publication } from '../lib/supabase';

const PublicationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      loadPublication(id);
    }
  }, [id]);

  const loadPublication = async (publicationId: string) => {
    try {
      setLoading(true);
      const data = await publicationsApi.getPublication(publicationId);
      setPublication(data);
    } catch (err) {
      setError('Publication not found');
      console.error('Failed to load publication:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (platform: string) => {
    if (!publication) return;

    const url = window.location.href;
    const title = publication.title;
    const text = `Check out this research: ${title}`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy URL:', err);
        }
        break;
    }
  };

  const getCategoryColor = (categoryName: string) => {
    const colors: { [key: string]: string } = {
      'Artificial Intelligence': 'bg-purple-100 text-purple-800 border-purple-200',
      'Quantum Computing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Climate Science': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Robotics': 'bg-orange-100 text-orange-800 border-orange-200',
      'Biotechnology': 'bg-pink-100 text-pink-800 border-pink-200',
      'Energy Systems': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[categoryName] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (year: number | null | undefined) => {
    return year ? year.toString() : 'N/A';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading publication...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !publication) {
    return (
      <div className="min-h-screen bg-white">
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Publication Not Found</h1>
              <p className="text-gray-600 mb-8">
                The publication you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-6 py-3 bg-base-blue text-white font-semibold rounded-lg hover:bg-dark-blue transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-base-blue hover:text-dark-blue font-medium mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Publications
          </button>

          {/* Publication Header */}
          <div className="mb-8">
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-light-blue/20 to-analogous-teal/20 text-base-blue text-sm font-medium rounded-full border border-base-blue/20">
                <BookOpen className="w-4 h-4 mr-1" />
                {publication.publication_type}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(publication.publication_year)}
              </span>
              {publication.research_categories && (
                <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${getCategoryColor(publication.research_categories.name)}`}>
                  <Tag className="w-4 h-4 mr-1" />
                  {publication.research_categories.name}
                </span>
              )}
              {publication.is_featured && (
                <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-sm font-medium rounded-full border border-yellow-200">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold font-playfair text-gray-900 mb-6 leading-tight">
              {publication.title}
            </h1>

            {/* Authors */}
            {publication.publication_authors && publication.publication_authors.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {publication.publication_authors
                    .sort((a, b) => a.author_order - b.author_order)
                    .map((pa, index) => (
                      <span key={pa.authors.id} className="text-gray-700">
                        {pa.authors.name}
                        {index < publication.publication_authors!.length - 1 && ', '}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Journal */}
            {publication.journal && (
              <p className="text-xl text-teal-700 font-medium mb-6">
                Published in {publication.journal}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              {publication.pdf_url && (
                <a
                  href={publication.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-base-blue to-muted-blue text-white font-semibold rounded-lg hover:from-dark-blue hover:to-base-blue transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
              
              {/* Share Dropdown */}
              <div className="relative group">
                <button className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 hover:border-teal-300">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
                
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="p-2">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <Twitter className="w-4 h-4 mr-3 text-blue-400" />
                      Share on Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <Linkedin className="w-4 h-4 mr-3 text-blue-600" />
                      Share on LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('email')}
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <Mail className="w-4 h-4 mr-3 text-gray-600" />
                      Share via Email
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 mr-3 text-gray-600" />
                      )}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Abstract */}
              {publication.abstract && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold font-playfair text-gray-900 mb-6">Abstract</h2>
                  <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-base-blue">
                    <Quote className="w-8 h-8 text-base-blue mb-4" />
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {publication.abstract}
                    </p>
                  </div>
                </div>
              )}

              {/* DOI */}
              {publication.doi && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Digital Object Identifier</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <code className="text-sm text-gray-600 font-mono">
                      DOI: {publication.doi}
                    </code>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-8">Publication Details</h3>
                
                <div className="space-y-6 mb-8">
                  {/* Citations */}
                  <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg border border-teal-100">
                    <div className="text-3xl font-bold gradient-text mb-1">
                      {publication.citations}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Citations</div>
                  </div>

                  {/* Publication Year */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">Year</span>
                    <span className="text-sm text-gray-900">{formatDate(publication.publication_year)}</span>
                  </div>

                  {/* Publication Type */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">Type</span>
                    <span className="text-sm text-gray-900">{publication.publication_type}</span>
                  </div>

                  {/* Journal */}
                  {publication.journal && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-600">Journal</span>
                      <span className="text-sm text-gray-900">{publication.journal}</span>
                    </div>
                  )}

                  {/* Category */}
                  {publication.research_categories && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-gray-600">Category</span>
                      <span className="text-sm text-gray-900">{publication.research_categories.name}</span>
                    </div>
                  )}

                  {/* Authors */}
                  {publication.publication_authors && publication.publication_authors.length > 0 && (
                    <div className="pt-4">
                      <h4 className="text-sm font-medium text-gray-600 mb-3">Authors</h4>
                      <div className="space-y-2">
                        {publication.publication_authors
                          .sort((a, b) => a.author_order - b.author_order)
                          .map((pa) => (
                            <div key={pa.authors.id} className="text-sm text-gray-900">
                              {pa.authors.name}
                              {pa.authors.affiliation && (
                                <div className="text-xs text-gray-500">{pa.authors.affiliation}</div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* PDF Download */}
                {publication.pdf_url && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <a
                      href={publication.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-base-blue to-muted-blue text-white font-medium rounded-lg hover:from-dark-blue hover:to-base-blue transition-all duration-300 transform hover:scale-105 group"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Full Paper
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PublicationDetailPage;