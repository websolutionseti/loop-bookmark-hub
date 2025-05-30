
import { BookmarkSidebar } from "@/components/BookmarkSidebar";
import { BookmarkDetails } from "@/components/BookmarkDetails";
import { BookmarkModal } from "@/components/BookmarkModal";
import { FloatingNavigation } from "@/components/FloatingNavigation";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { useState } from "react";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BookmarkProvider>
      <div className="h-screen flex bg-background">
        <FloatingNavigation />
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
