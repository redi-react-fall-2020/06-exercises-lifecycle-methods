import React from "react";
import { getMemberAnimalsWithUrls } from "./student";

// Step 01 - Create a like toggle button
/** ✨ Requirements ✨
 * When you click the button the class should toggle from 'default' to 'active
 * So if a button is 'default' and is clicked it should now have an 'active' className and vice versa
 */

// Step 02 - Refactor into a like count
/**
 * ✨ Requirements ✨
 * 1. The like count displays the number of likes each student / teacher has.
 * 2. The starting like count should be a random number and is set when the component first mounts.
 * 3. When the button is clicked the like count should go up. The count should be set and stored in state.
 * 4. When clicked the button should have a class of "active" that after 500ms will be reset to "default"
 *
 */
// Step 03 - Refactor with all the same requirements into a functional component.

export class MemberRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      likeCount: props.member.likeCount || 0
    };
  }

  componentDidMount() {
    const randomNumber = Math.trunc(Math.random() * 100);
    this.setState({ likeCount: randomNumber });
  }

  componentDidUpdate() {
    if (this.state.active) {
      setTimeout(() => {
        this.setState({ active: false });
      }, 500);
    }
  }

  addLike = () => {
    this.setState({
      active: !this.state.active,
      likeCount: this.state.likeCount + 1
    });
  };

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
        <td
          className={`button-cell ${this.state.active ? "active" : "default"}`}
        >
          <button onClick={this.addLike}>
            <span className="clap-count-total">{this.state.likeCount}</span>
          </button>
        </td>
      </tr>
    );
  }
}
