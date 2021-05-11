
/* ----- IMPORTS ----- */

import { Component } from 'react';
//import css
import './style.css'
// import componentes
import { Posts } from '../../Components/Posts';
import { Button} from '../../Components/Button'
// import funcoes
import {loadPosts} from '../../Utils/load-posts';
import { TextInput } from '../../Components/TextInput';


/* ----- RETURNS ----- */

export class Home extends Component {
 
   state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 4,
    searchValue: ''
    } ;
 
  componentDidMount() {
   this.loadPosts();
  }
  loadPosts = async () => {
    const {page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page,postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  handleChange = (e) => {
   const {value} = e.target;
   this.setState({searchValue: value});
  }

  loadMorePosts = () => {
    const {
      page, 
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    console.log(page, postsPerPage, nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({posts, page: nextPage});
  }

  render() {
    const {posts, page, postsPerPage, allPosts, searchValue} = this.state;
    const noMorePosts = page + postsPerPage  >= allPosts.length;
    
    const filteredPosts = !!searchValue ? allPosts.filter (posts => {
      return posts.title.toLowerCase().includes(searchValue.toLowerCase());
    }) : posts ;
    return ( 
      //class name no js
      <section className="container">
        <div className="search-container"> {!!searchValue && (
          <>
          <h1>Search value: {searchValue}</h1><br></br>
        </>
        )}
        
        <TextInput searchValue={searchValue} handleChange={this.handleChange}></TextInput>
        </div> 
        
        {filteredPosts.length > 0 && (<Posts posts={filteredPosts}/>)}

        {filteredPosts.length === 0 && (<p>Não existem posts</p>)}
        

        {
          !searchValue && (
            <Button text="Carregar mais posts"
        onClick={this.loadMorePosts}
        disabled={noMorePosts}
        >
         
        </Button>
          )
        }
        
         </section>
          // não pode colocar dois elementos irmãos no react, por exemplo um outro div, nesse caso. Apenas um elemento, que pode ou não ter elementos dentro dele
        );
  }
}


