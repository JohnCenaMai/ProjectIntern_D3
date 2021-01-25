# Folder struture
- controllers: container every controller
- models: container every models 
- routes: routing endpoint
- utils: helper functions
- middlewares: contain all middleware
- public: contain every public resource
- config.env: this is the config file
- app.js: main file
- server.js: use to connect to db

# Output data format (JSON)
- Format:
``` 
{
  status: "success" || "fail",
  msg: "This is the message you want to send back to client",
  count(optional): count
  data: {}
}
````

- Sample success data

```
{
    "status": "success",
    "msg": "Query successfully!",
    "count": 5,
    "data": [
        {
            "id": 2,
            "title": "Post hai",
            "content": "This is post 2",
            "like": [
                "khaclam2409@gmail.com",
                "khaclamvna@gmail.com"
            ],
            "username": "KhacLam2409"
        },
        {
            "id": 3,
            "title": "Post hai",
            "content": "This is post 2",
            "like": null,
            "username": "KhacLam2409"
        },
        {
            "id": 4,
            "title": "Post hai",
            "content": "This is post 2",
            "like": [
                "Simplify Things"
            ],
            "username": "KhacLam2409"
        }
    ]
}
```

- Sample success data: 
```
{
  status: "fail,
  msg: "Something went wrong!"
  errs: []
}
```
