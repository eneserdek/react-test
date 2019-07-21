import React from 'react';
import './styles.css';

class App extends React.Component {
  state = {
    users: null,
    loading: false,
    error: false,
    showUsers: false,
    selectedIndex: null,
  };

  componentDidMount() {
    this.getUsers();
  }
  getUsers = () => {
    const URL = 'http://uinames.com/api/?ext&amount=5';
    this.setState({ loading: false });
    fetch(URL)
      .then(users => users.json())
      .then(data => {
        console.log(data);
        this.setState({ users: data, loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true, loading: false });
      });
  };
  toggleUsers = () => {
    this.setState({ showUsers: !this.state.showUsers });
  };
  toggleInfos = index => {
    console.log(index);
    this.setState({ selectedIndex: index, showUserInfo: true });
  };

  render() {
    const { users, loading, error, showUsers, selectedIndex } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>An error occured</div>;
    }

    return (
      <div>
        <button onClick={this.toggleUsers}>Get Users!</button>
        <div className="left">
          {showUsers &&
            users &&
            users.map(({ name }, index) => {
              return (
                <p
                  key={index}
                  onClick={e => {
                    this.toggleInfos(index);
                  }}
                  className="bold color"
                >
                  {name}
                </p>
              );
            })}
        </div>
        <div>
          {showUsers && typeof selectedIndex === 'number' && (
            <div>
              <img src={users[selectedIndex].photo} alt="user_photo" />
              <p className="bold">
                {users[selectedIndex].name}
                {users[selectedIndex].surname}
              </p>
              <p>Gender:{users[selectedIndex].gender}</p>
              <p>Country of Origin:{users[selectedIndex].region}</p>
              <p>Age:{users[selectedIndex].age}</p>
              <p>Phone:{users[selectedIndex].phone}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
