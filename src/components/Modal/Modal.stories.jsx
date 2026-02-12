import { useState } from 'react';
import Modal from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
};

export const Basic = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div style={{padding:20}}>This is a modal content</div>
      </Modal>
    </>
  );
};

export const Closed = () => <Modal isOpen={false} onClose={() => {}} />;
