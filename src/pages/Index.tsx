
import { BookmarkSidebar } from "@/components/BookmarkSidebar";
import { BookmarkDetails } from "@/components/BookmarkDetails";
import { BookmarkModal } from "@/components/BookmarkModal";
import { Navigation } from "@/components/Navigation";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { useState } from "react";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BookmarkProvider>
      <div className="h-screen flex bg-background">
        <Navigation />
        <BookmarkSidebar />
        <BookmarkDetails onEdit={() => setIsModalOpen(true)} />
        <BookmarkModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </BookmarkProvider>
  );
};

export default Index;
