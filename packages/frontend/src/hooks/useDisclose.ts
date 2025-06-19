import { useState, useCallback } from "react";

type UseDiscloseArgs = {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

export function useDisclose({
  isOpen: _isOpen = false,
  onClose: _onClose,
  onOpen: _onOpen,
}: UseDiscloseArgs = {}) {
  const [isOpen, setIsOpen] = useState(_isOpen);

  const onOpen = useCallback(() => {
    setIsOpen(true);
    _onOpen?.();
  }, [_onOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    _onClose?.();
  }, [_onClose]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
      return;
    }
    onOpen();
    return;
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    setIsOpen,
  };
}
