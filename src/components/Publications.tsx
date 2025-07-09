import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, Calendar, Users, Filter, Loader2, AlertCircle, Download, Eye, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';
import { useCategories } from '../hooks/useCategories';
import type { Publication, PublicationAuthor } from '../types/prisma';

const Publications = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPublicationType, setSelectedPublicationType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const { publications = [], loading: publicationsLoading, error: publicationsError } = usePublications({
    category: selectedCategory
  });
  
  const { categories, loading: categoriesLoading } = useCategories();
  const publicationTypes = publications.length
    ? Array.from(new Set(publications.map(pub => pub.publicationType).filter(Boolean))).sort()
    : [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [publications]);

  const formatDate = (year: number | null | undefined) => {
    return year ? year.toString() : 'N/A';
  };

  const getCategoryColor = (categoryName: string) => {
    const colors: { [key: string]: string } = {
      'Artificial Intelligence': 'bg-blue-100 text-blue-800 border-blue-200',
      'Quantum Computing': 'bg-base-blue/10 text-base-blue border-base-blue/20',
      'Climate Science': 'bg-analogous-teal/10 text-analogous-teal border-analogous-teal/20',
      'Robotics': 'bg-amber/10 text-amber border-amber/20',
      'Biotechnology': 'bg-light-blue/10 text-muted-blue border-light-blue/20',
      'Energy Systems': 'bg-amber/10 text-amber border-amber/20'
    };
    return colors[categoryName] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const viewPublication = (publicationId: string) => {
    navigate(`/publications/${publicationId}`);
  };

  // Memoized and defensive filteredPublications
  const filteredPublications = React.useMemo(() => {
    return (publications || []).filter((pub) => {
      const matchesCategory = selectedCategory === 'all' || pub.category?.slug === selectedCategory;
      const matchesPublicationType = selectedPublicationType === 'all' || (pub.publicationType && pub.publicationType === selectedPublicationType);
      return matchesCategory && matchesPublicationType;
    });
  }, [publications, selectedCategory, selectedPublicationType]);

  if (publicationsError) {
    return (
      <section id="publications" className="py-24 bg-gradient-to-b from-neutral-100 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Publications</h2>
          <p className="text-gray-600 mb-8">
            We're having trouble connecting to our database. Please make sure your PostgreSQL server is running and your connection settings are correct.
          </p>
          <div className="bg-neutral-100 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Troubleshooting:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Check your PostgreSQL server status and credentials in the <code>.env</code> file.</li>
              <li>Ensure the database tables are created (see migration SQL files).</li>
              <li>Restart the development server after updating environment variables.</li>
              <li>Check the server logs for detailed error messages.</li>
            </ol>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="publications" className="py-16 bg-gradient-to-b from-neutral-100 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-8 reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-4">
            Research & Reports
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our latest publications, whitepapers and policy briefs that drive 
            the conversation on global sustainability and planetary health.
          </p>
        </div>

        {/* Filter Toggle Button (left) */}
        <div className="mb-4 reveal">
          <div className="flex items-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-base font-medium border border-gray-200 shadow-sm bg-white hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 ${showFilters ? 'ring-2 ring-blue-200' : ''}`}
              style={{ minWidth: 'fit-content' }}
            >
              <Filter className="w-5 h-5 text-base-blue" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mt-4 mb-2 space-y-6">
              {/* Publication Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publication Type:
                </label>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      if (selectedPublicationType === 'all') {
                        window.location.reload();
                      } else {
                        setSelectedPublicationType('all');
                      }
                    }}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedPublicationType === 'all'
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-green-300'
                    }`}
                  >
                    All Types
                  </button>
                  {publicationTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        if (selectedPublicationType === type) {
                          window.location.reload();
                        } else {
                          setSelectedPublicationType(type);
                        }
                      }}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedPublicationType === type
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Research Area:
                </label>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      if (selectedCategory === 'all') {
                        window.location.reload();
                      } else {
                        setSelectedCategory('all');
                      }
                    }}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === 'all'
                        ? 'bg-gradient-to-r from-base-blue to-muted-blue text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-base-blue/30'
                    }`}
                  >
                    All Areas
                  </button>
                  {categoriesLoading ? (
                    <div className="flex items-center gap-2 px-6 py-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-gray-500">Loading categories...</span>
                    </div>
                  ) : (
                    categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          if (selectedCategory === category.slug) {
                            window.location.reload();
                          } else {
                            setSelectedCategory(category.slug);
                          }
                        }}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedCategory === category.slug
                            ? 'bg-gradient-to-r from-base-blue to-muted-blue text-white shadow-lg transform scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-base-blue/30'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Active Filters Summary */}
              {(selectedCategory !== 'all' || selectedPublicationType !== 'all') && (
                <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== 'all' && (
                      <span className="inline-flex items-center px-3 py-1 bg-base-blue/10 text-base-blue text-xs font-medium rounded-full border border-base-blue/20">
                        {categories.find(cat => cat.slug === selectedCategory)?.name || selectedCategory}
                        <button
                          onClick={() => setSelectedCategory('all')}
                          className="ml-2 text-base-blue hover:text-dark-blue"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {selectedPublicationType !== 'all' && (
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
                        {selectedPublicationType}
                        <button
                          onClick={() => setSelectedPublicationType('all')}
                          className="ml-2 text-green-700 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedPublicationType('all');
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        {!publicationsLoading && filteredPublications.length > 0 && (
          <div className="mb-2 reveal">
            <p className="text-gray-600 text-sm">
              Showing <span className="font-semibold text-gray-900">{filteredPublications.length}</span> 
              {filteredPublications.length === 1 ? ' publication' : ' publications'}
              {selectedCategory !== 'all' || selectedPublicationType !== 'all' ? ' matching your filters' : ''}
            </p>
          </div>
        )}

        {/* Publications List */}
        {publicationsLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-base-blue mx-auto mb-4" />
              <p className="text-gray-600">Loading publications...</p>
            </div>
          </div>
        ) : filteredPublications.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Publications Found</h3>
            <p className="text-gray-600 mb-8">
              {selectedCategory === 'all' && selectedPublicationType === 'all'
                ? 'No publications have been added yet.'
                : `No publications found in the selected category and publication type.`
              }
            </p>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPublicationType('all');
              }}
              className="text-base-blue hover:text-dark-blue font-medium"
            >
              View All Publications
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPublications.map((publication, index) => (
              <div
                key={publication.id}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover-lift group reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    {/* Publication Type & Year */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {publication.publicationType}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(publication.publicationYear)}
                      </span>
                      {publication.category && (
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(publication.category.name)}`}>
                          {publication.category.name}
                        </span>
                      )}
                      {publication.isFeatured && (
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-amber/10 to-amber/20 text-amber text-xs font-medium rounded-full border border-amber/20">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-base-blue transition-colors leading-tight cursor-pointer"
                        onClick={() => viewPublication(publication.id)}>
                      {publication.title}
                    </h3>

                    {/* Authors */}
                    {publication.publicationAuthors && publication.publicationAuthors.length > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-600 text-sm">
                          {publication.publicationAuthors
                            .sort((a: PublicationAuthor, b: PublicationAuthor) => a.authorOrder - b.authorOrder)
                            .map((pa: PublicationAuthor) => pa.author?.name)
                            .join(', ')}
                        </p>
                      </div>
                    )}

                    {/* Journal */}
                    {publication.journal && (
                      <p className="text-base-blue font-medium mb-4 text-lg">
                        {publication.journal}
                      </p>
                    )}

                    {/* Abstract */}
                    {publication.abstract && (
                      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {publication.abstract}
                      </p>
                    )}

                    {/* DOI */}
                    {publication.doi && (
                      <p className="text-xs text-gray-500 mb-2 font-mono">
                        DOI: {publication.doi}
                      </p>
                    )}
                  </div>

                  {/* Stats & Actions */}
                  <div className="lg:text-right lg:min-w-[200px]">
                    <div className="flex lg:flex-col gap-3">
                      <button
                        onClick={() => viewPublication(publication.id)}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-base-blue to-dark-blue text-white text-sm font-medium rounded-full hover:from-dark-blue hover:to-base-blue transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      
                      {publication.pdfUrl && (
                        <a
                          href={publication.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-base-blue to-muted-blue text-white text-sm font-medium rounded-full hover:from-dark-blue hover:to-base-blue transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                          <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Publications;