import { NavLink } from "react-router-dom"


export default function Header() {

    const links = [
        { name: "TASK", path: "/" },
        { name: "ADD TASK", path: "/addtask" },
    ]



    return (
        <header>
            <div>
                {links.map((l, i) => (
                    <NavLink
                        key={i}
                        to={l.path}>{l.name}</NavLink>
                ))}
            </div>
        </header>
    )
}