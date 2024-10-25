import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface ModalInfoProps {
  message: string;
  status: boolean;
  message2?: string;
  setStatus?: (status:boolean) => void;
}

export default function ModalInfo({message, message2, status, setStatus}:ModalInfoProps) {
  const {onOpenChange} = useDisclosure();

  return (
    <>
      <Modal isOpen={status} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Hola!</ModalHeader>
              <ModalBody>
                <p> 
                  {message}
                </p>
                <p>{message2}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} onClick={() => setStatus && setStatus(false)}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}