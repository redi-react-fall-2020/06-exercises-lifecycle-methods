import React from "react";
import { getMemberAnimalsWithUrls } from "./student";

export class MemberRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      likes: 0
    };
  }

  render() {
    const { member } = this.props;
    return (
      <tr className="member-row" key={member.name}>
        <td className="avatar-cell">
          <img src={member.image} alt={member.name} />
        </td>
        <td className="name-cell">{member.name}</td>
        <td className="role-cell">{member.role}</td>
        <td className="animals-cell">
          {getMemberAnimalsWithUrls(member).map((animal) => (
            <div key={`${animal.name}-${member.name}`}>
              <img src={animal.url} alt={animal.name} title={animal.name} />
              <span>{animal.name}</span>
            </div>
          ))}
        </td>
        <td className="button-cell">
          <button />
        </td>
      </tr>
    );
  }
}
