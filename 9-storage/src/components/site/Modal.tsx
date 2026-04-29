import type { ReactNode } from 'react';

type ModalProps = {
  onClick: () => void;
  children: ReactNode;
};

export const Modal = ({ onClick, children }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4" onClick={onClick}>
      <div className="w-full max-w-6xl h-[60vh] rounded-2xl bg-gray-950 border border-gray-800" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
