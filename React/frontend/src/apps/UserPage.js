export const UserPage = () => {
    const users = [
      {name:"Shourav", age: 27},
      {name: "Sajeeb", age: 28},
      {name: "Sadia", age: 20},
      {name: "Sneha", age: 17}
    ]
    
    return ( 
      <div class="users">
        {
          users.map((user, key) => {
            return <User user={user}/>
          })
        }
      </div>
      
    );
  }
  
const User = (args) => {
    return (
      <div>
        <h1>{args.user.name}</h1>
        <h2>{args.user.age}</h2>
        <h3 style={{color:args.user.age < 18 ? "Green" : "Blue"}}>{args.user.age < 18 ? "Under Age" : "Over Age"}</h3>
        <br />
      </div>
    )
  }
  