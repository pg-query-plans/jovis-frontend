# Jovis frontend

## Introduction
In the world of relational database management, the query op- timizer is a critical component that significantly impacts query performance. To address the challenge of optimizing query perfor- mance due to the complexity of optimizers – especially with join operations – we introduce Jovis. This novel visualization tool pro- vides a window into the often intricate process of query optimiza- tion in PostgreSQL, making it more accessible and understandable. PostgreSQL employs two different query optimization strategies: the Dynamic Programming (DP) Optimizer for most scenarios and the Genetic Query Optimizer (GEQO) for more complex queries with numerous joins, both of which are supported in Jovis. Our tool visualizes the optimizer’s decision-making process, from evaluat- ing access paths for each relation to determining join orderings, all using data derived from the optimizer’s logs. Jovis not only clari- fies the query optimization process through visualizations but also serves as an invaluable learning tool for learners and a practical resource for experienced database professionals looking to optimize their query performance or even the query optimizer itself.

## Installation

1. Use the following command to install dependencies.
```bash
npm install
```

2. Use the following command to run it.
```bash
npm start
```
