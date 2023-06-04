import React from 'react';

export interface CommonFormProps {
  onClose: () => void;
  id?: string | number;
}

export type CommonForm = React.ComponentType<CommonFormProps>;