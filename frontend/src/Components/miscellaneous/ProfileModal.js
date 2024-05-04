import { ViewIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    IconButton,
    Text,
    Image,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            )}
            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work Sans"
                        textAlign="center"
                    >
                        {user.name}
                    </ModalHeader>
                    <ModalCloseButton
                        fontSize="xl" // Increase font size of close icon
                        _focus={{ outline: "none" }} // Remove default focus outline
                        _hover={{ bg: "red.600" }} // Change background color on hover
                        _active={{ bg: "red.500" }} // Change background color on click
                    />
                    <ModalBody textAlign="center">
                        <Image
                            borderRadius="full"
                            boxSize="150px"
                            src={user.pic}
                            alt={user.name}
                            mx="auto"
                            mb={4}
                        />
                        <Text fontSize="30px" fontFamily="Work Sans" mb={4}>
                            Email: {user.email}
                        </Text>
                    </ModalBody>
                    <ModalFooter justifyContent="center">
                        <Button onClick={onClose} bgColor={"#ff4d4d"}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfileModal;