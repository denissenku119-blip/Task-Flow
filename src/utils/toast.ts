import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const showSuccess = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: 'bottom-center',
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    duration: 5000,
    position: 'bottom-center',
  });
};

export const showWarning = (message: string) => {
  toast.warning(message, {
    duration: 4000,
    position: 'bottom-center',
  });
};

export const showInfo = (message: string) => {
  toast.info(message, {
    duration: 3000,
    position: 'bottom-center',
  });
};

export const showToast = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
  switch (type) {
    case 'success':
      showSuccess(message);
      break;
    case 'error':
      showError(message);
      break;
    case 'warning':
      showWarning(message);
      break;
    case 'info':
      showInfo(message);
      break;
  }
};

export const useToast = () => {
  const { t } = useTranslation();
  return {
    showSuccess: (key: string) => showSuccess(t(key)),
    showError: (key: string) => showError(t(key)),
    showWarning: (key: string) => showWarning(t(key)),
    showInfo: (key: string) => showInfo(t(key)),
    showToast: (type: 'success' | 'error' | 'warning' | 'info', key: string) => showToast(type, t(key)),
  };
};