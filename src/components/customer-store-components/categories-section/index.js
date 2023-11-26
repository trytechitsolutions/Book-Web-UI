import React, { useState } from 'react';
import { List, ListItem, makeStyles, Paper, Typography } from '@material-ui/core';

const categories = [
  { name: 'Electronics', items: ['Mobiles', 'Laptops', 'Accessories'] },
  { name: 'Men', items: ['Clothing', 'Shoes', 'Accessories'] },
  { name: 'Women', items: ['Clothing', 'Shoes', 'Accessories'] },
  { name: 'Home Accessories', items: ['Decor', 'Furniture', 'Kitchenware'] },
  { name: 'Sports', items: ['Fitness', 'Outdoor', 'Equipment'] },
  { name: 'Books', items: ['Fiction', 'Non-fiction', 'Children'] },
];

const useStyles = makeStyles((theme) => ({
  categoryList: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    padding: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  card: {
    padding: theme.spacing(1),
  },
  nestedList: {
    paddingLeft: theme.spacing(2),
  },
}));

const CategoriesList = () => {
  const classes = useStyles();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleCategoryHover = (categoryName) => {
    setHoveredCategory(categoryName);
  };

  return (
    <Paper elevation={3} className={classes.card}>
      <List component="ul" className={classes.categoryList}>
        {categories.map((category, index) => (
          <ListItem
            key={index}
            component="li"
            className={classes.listItem}
            onMouseEnter={() => handleCategoryHover(category.name)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {category.name}
          </ListItem>
        ))}
      </List>

      {/* Display items corresponding to hovered category */}
      {hoveredCategory && (
        <Paper elevation={2} className={classes.card}>
          <Typography variant="subtitle1">
            {categories.find((category) => category.name === hoveredCategory)?.items.map((item, index) => (
              <Typography key={index} className={classes.nestedList}>
                {item}
              </Typography>
            ))}
          </Typography>
        </Paper>
      )}
    </Paper>
  );
};

export default CategoriesList;
