import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container } from '@material-ui/core';
import './App.css';
import { call } from './service/AppService';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: [
                {id: 0, title: "Hello World 0", done: true },
                {id: 1, title: "Hello World 1", done: false },
            ],
        };
    }

    componentDidMount() {
        call("/todo", "GET", null).then((response) => 
            this.setState({ item: response.data })
        );
    }

    add = (item) => {
        // const thisItems = this.state.items;
        // item.id = "ID-" + thisItems.length;
        // item.done = false;
        // thisItems.push(item);
        // this.setState({ items: thisItems });

        call("/todo", "POST", item).thegn((response) => 
            this.setState({ item: response.data })
        );
    };

    delete = (item) => {
        // const thisItems = this.state.items;
        // const newItems = thisItems.filter(e => e.id !== item.id);
        // this.setState({ items: newItems });

        call("/todo", "DELETE", item).then((response) => 
            this.setState({ items: response.data })
        );
    };

	render() {
        // var todoItems = this.state.items.map((item, idx) => (
        //     <Todo item={item} key={item.id} />
        // ));
        var todoItems = this.state.items.length > 0 && (
            <Paper style={{ margin: 16}}>
                <List>
                    {this.state.items.map((item, idx) => (
                        <Todo item={item} key={item.id} delete={this.delete} />
                    ))}
                </List>
            </Paper>
        );

		return (
			// <div className="App">
			// 	{todoItems}
			// </div>
            <div className="App">
                <Container maxWidth="md">
                    <AddTodo add={this.add} />
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
		)
	}
}

export default App;
