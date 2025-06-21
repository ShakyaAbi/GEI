import React, { useState, useEffect } from 'react';
import { BookOpen, ExternalLink, Calendar, Users, Filter, Loader2, AlertCircle, Download } from 'lucide-react';
import { usePublications } from '../hooks/usePublications';
import { useCategories } from '../hooks/useCategories';

const Publications = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { publications, loading: publicationsLoading, error: publicationsError } = usePublications({
    category: selectedCategory
  });
  
  const { categories, loading: categoriesLoading } = useCategories();

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
      'Artificial Intelligence': 'bg-purple-100 text-purple-800 border-purple-200',
      'Quantum Computing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Climate Science': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Robotics': 'bg-orange-100 text-orange-800 border-orange-200',
      'Biotechnology': 'bg-pink-100 text-pink-800 border-pink-200',
      'Energy Systems': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[categoryName] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (publicationsError) {
    return (
      <section id="publications" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Publications</h2>
          <p className="text-gray-600 mb-8">
            We're having trouble connecting to our database. Please make sure your PostgreSQL server is running and your connection settings are correct.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 text-left">
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
    <section id="publications" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl lg:text-5xl font-bold font-playfair text-gray-900 mb-6">
            Research & Reports
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our latest publications, whitepapers and policy briefs that drive 
            the conversation on global sustainability and planetary health.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 reveal">
          <div className="flex items-center gap-4 mb-6">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Filter by Research Area:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-teal-300'
              }`}
            >
              All Publications
            </button>
            {categoriesLoading ? (
              <div className="flex items-center gap-2 px-6 py-3">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-gray-500">Loading categories...</span>
              </div>
            ) : (
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.slug
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-teal-300'
                  }`}
                >
                  {category.name}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Publications List */}
        {publicationsLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading publications...</p>
            </div>
          </div>
        ) : publications.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Publications Found</h3>
            <p className="text-gray-600 mb-8">
              {selectedCategory === 'all' 
                ? 'No publications have been added yet.' 
                : `No publications found in the selected category.`
              }
            </p>
            <button 
              onClick={() => setSelectedCategory('all')}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              View All Publications
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {publications.map((publication, index) => (
              <div
                key={publication.id}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover-lift group reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    {/* Publication Type & Year */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-xs font-medium rounded-full border border-teal-200">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {publication.publication_type}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(publication.publication_year)}
                      </span>
                      {publication.research_categories && (
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(publication.research_categories.name)}`}>
                          {publication.research_categories.name}
                        </span>
                      )}
                      {publication.is_featured && (
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-xs font-medium rounded-full border border-yellow-200">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-700 transition-colors leading-tight">
                      {publication.title}
                    </h3>

                    {/* Authors */}
                    {publication.publication_authors && publication.publication_authors.length > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-4 h-4 text-gray-500" />
                        <p className="text-gray-600 text-sm">
                          {publication.publication_authors
                            .sort((a, b) => a.author_order - b.author_order)
                            .map(pa => pa.authors.name)
                            .join(', ')}
                        </p>
                      </div>
                    )}

                    {/* Journal */}
                    {publication.journal && (
                      <p className="text-teal-700 font-medium mb-4 text-lg">
                        {publication.journal}
                      </p>
                    )}

                    {/* Abstract */}
                    {publication.abstract && (
                      <p className="text-gray-600 leading-relaxed mb-4">
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
                    <div className="mb-6">
                      <div className="text-3xl font-bold gradient-text">
                        {publication.citations}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">Citations</div>
                    </div>
                    
                    <div className="flex lg:flex-col gap-3">
                      {publication.pdf_url && (
                        <a
                          href={publication.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-sm font-medium rounded-full hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                          <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      )}
                      <button className="inline-flex items-center px-6 py-3 bg-white text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-all duration-300 border border-gray-200 hover:border-teal-300 group/btn">
                        View Details
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Admin Panel Link */}
        <div className="mt-20 text-center reveal">
          <div className="bg-gradient-to-br from-gray-50 to-teal-50 rounded-3xl p-8 lg:p-12 border border-gray-200">
            <h3 className="text-2xl font-bold font-playfair text-gray-900 mb-4">Manage Publications</h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Add, edit, and organize research publications through our comprehensive admin interface.
            </p>
            <a
              href="/admin/publications"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-full hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Open Admin Panel
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;