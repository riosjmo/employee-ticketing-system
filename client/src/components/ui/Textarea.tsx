import React from "react"

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export default function Textarea(props: Props) {
	return <textarea {...props} style={{ padding: "6px 8px", width: "100%", fontFamily: "inherit" }} />
}
