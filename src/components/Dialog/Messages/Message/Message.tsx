import React, {FC} from "react";

interface MessageProps {
    msgText: string
}
const Message: FC<{msgText: MessageProps['msgText']}> = ({msgText}) => (
    <p>{msgText}</p>
)

export default Message;