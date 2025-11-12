/**
 * Semantic Search Interface
 * Search documents using semantic similarity
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Search, Sparkles, FileText, Loader2 } from 'lucide-react';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { SemanticSearch } from '@/lib/knowledge/search';
import { EmbeddingGenerator } from '@/lib/knowledge/embeddings';
import { SearchResult } from '@/types/knowledge.types';
import { toast } from 'sonner';

export function SemanticSearchUI() {
  const [query, setQuery] = useState('');
  const [topK, setTopK] = useState(5);
  const [threshold, setThreshold] = useState(0.5);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchTime, setSearchTime] = useState(0);

  const { getAllDocuments, config } = useKnowledgeStore();
  const documents = getAllDocuments();

  // Get all chunks
  const allChunks = documents.flatMap((doc) => doc.chunks);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    if (documents.length === 0) {
      toast.error('No documents in knowledge base');
      return;
    }

    setIsSearching(true);
    const startTime = Date.now();

    try {
      // Create embedding generator
      const generator = new EmbeddingGenerator({
        provider: 'simulated',
        model: config.embeddingModel,
        dimensions: 1536
      });

      // Create search instance
      const search = new SemanticSearch(generator);

      // Perform search
      const searchResults = await search.search(query, allChunks, documents, {
        topK,
        threshold
      });

      setResults(searchResults);
      setSearchTime(Date.now() - startTime);

      if (searchResults.length === 0) {
        toast.info('No results found. Try adjusting threshold or query.');
      } else {
        toast.success(`Found ${searchResults.length} results`);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSearching) {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-5 w-5 text-nvidia-green" />
            Semantic Search
          </CardTitle>
          <CardDescription className="text-xs">
            Search your knowledge base using AI-powered similarity
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Query Input */}
          <div className="space-y-2">
            <Label htmlFor="search-query">Search Query</Label>
            <div className="flex gap-2">
              <Input
                id="search-query"
                placeholder="What are you looking for?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isSearching}
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !query.trim()}
                className="bg-nvidia-green hover:bg-nvidia-green-light text-black"
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Search Parameters */}
          <div className="grid grid-cols-2 gap-4">
            {/* Top K */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="top-k">Results to Return</Label>
                <span className="text-sm text-muted-foreground">{topK}</span>
              </div>
              <Slider
                id="top-k"
                min={1}
                max={20}
                step={1}
                value={[topK]}
                onValueChange={([v]) => setTopK(v)}
              />
            </div>

            {/* Threshold */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="threshold">Similarity Threshold</Label>
                <span className="text-sm text-muted-foreground">
                  {threshold.toFixed(2)}
                </span>
              </div>
              <Slider
                id="threshold"
                min={0}
                max={1}
                step={0.05}
                value={[threshold]}
                onValueChange={([v]) => setThreshold(v)}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{documents.length} documents • {allChunks.length} chunks</span>
            {results.length > 0 && (
              <span>Search completed in {searchTime}ms</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              Search Results ({results.length})
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {results.map((result, index) => (
                  <Card key={result.chunk.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                        <span className="text-sm font-medium">
                          {result.document.name}
                        </span>
                      </div>
                      <Badge
                        variant={
                          result.score > 0.8
                            ? 'default'
                            : result.score > 0.6
                            ? 'secondary'
                            : 'outline'
                        }
                        className="text-xs"
                      >
                        {(result.score * 100).toFixed(1)}% match
                      </Badge>
                    </div>

                    <div className="text-sm text-muted-foreground mb-2">
                      <FileText className="h-3 w-3 inline mr-1" />
                      Chunk {result.chunk.index + 1} of {result.document.chunks.length}
                    </div>

                    <p className="text-sm whitespace-pre-wrap bg-nvidia-gray-dark p-3 rounded">
                      {result.chunk.content}
                    </p>

                    {result.chunk.metadata && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {result.chunk.metadata.page && (
                          <span>Page {result.chunk.metadata.page}</span>
                        )}
                        {result.chunk.metadata.section && (
                          <span> • Section: {result.chunk.metadata.section}</span>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isSearching && results.length === 0 && query && (
        <Card className="p-8">
          <div className="text-center text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">No results yet</p>
            <p className="text-xs mt-1">Enter a query and click search</p>
          </div>
        </Card>
      )}
    </div>
  );
}
