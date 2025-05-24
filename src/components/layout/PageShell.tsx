import React, { useState, useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import DrawingBoard from '../DrawingBoard';
import { saveDrawing } from '../../services/boardService';

interface PageShellContext {
  setBoardID: (content: string | undefined) => void;
  setDrawingContent: (content: string | undefined) => void;
  setOnSaveDrawing: (handler: ((content: string) => Promise<void>) | undefined) => void;
}

const PageShell: React.FC = () => {
  const [boardIDstate, setBoardID] = useState<string>();
  const [drawingContent, setDrawingContent] = useState<string>();
  const [onSaveDrawing, setOnSaveDrawing] = useState<((content: string) => Promise<void>) | undefined>();

  const handleSave = useCallback(async (boardId: string, content: string) => {
    try {
      await saveDrawing(boardId, content);
    } catch (error) {
      console.error('Failed to save drawing:', error);
    }
  }, []);

  return (
    <div className={`page-shell page-shell--has-background`}>
      <Header />
      <main className={`page-shell__main page-shell__main--with-board`}>
        <div className="page-shell__content">
          <Outlet context={{
            setBoardID,
            setDrawingContent,
            setOnSaveDrawing
          }} />
        </div>
          <DrawingBoard 
            onSave={handleSave}
            boardID={boardIDstate}
            initialContent={drawingContent}
            setDrawingContent={setDrawingContent}
          />
      </main>
    </div>
  );
};

export type { PageShellContext };
export default PageShell;
