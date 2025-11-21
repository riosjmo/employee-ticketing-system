import React from "react"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: Props) {
	return (
		<button {...props} style={{ padding: "8px 12px", cursor: "pointer" }} />
	)
}
