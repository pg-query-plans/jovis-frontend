# Jovis Frontend
Jovis: A Visualization Tool for PostgreSQL Query Optimizer

## Introduction
In the world of relational database management, the query optimizer is a critical component that significantly impacts query performance. To address the challenge of optimizing query performance due to the complexity of optimizers – especially with join operations – we introduce Jovis. This novel visualization tool provides a window into the often intricate process of query optimization in PostgreSQL, making it more accessible and understandable. PostgreSQL employs two different query optimization strategies: the Dynamic Programming (DP) Optimizer for most scenarios and the Genetic Query Optimizer (GEQO) for more complex queries with numerous joins, both of which are supported in Jovis. Our tool visualizes the optimizer’s decision-making process, from evaluating access paths for each relation to determining join orderings, all using data derived from the optimizer’s logs. Jovis not only clarifies the query optimization process through visualizations but also serves as an invaluable learning tool for learners and a practical resource for experienced database professionals looking to optimize their query performance or even the query optimizer itself.

## How to Run
To run the project, follow these steps:

1. Install dependencies:

```bash
npm install
```

or

```bash
npm i
```

2. Start the application:

```bash
npm run start
```

This will launch the application, and you can access it in your web browser at [http://localhost:3000](http://localhost:3000).
