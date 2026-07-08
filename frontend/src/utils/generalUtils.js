export const fetchItems = async (apiEndpoint) => {
  const response = await fetch(apiEndpoint);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Failed to fetch data from ${apiEndpoint}`);
  }

  return data;
};

export const saveEdit = async ({
  item,
  index,
  isNew,
  newItems,
  setNewItems,
  items,
  setItems,
  apiEndpoint,
  setSuccessMessage,
  setError,
}) => {
  try {
    if (setError) {
      setError("");
    }

    if (!item) {
      throw new Error("No item provided to save.");
    }

    const {
      _id,
      __v,
      createdAt,
      updatedAt,
      isEditing,
      isNew: localIsNew,
      ...itemToSave
    } = item;

    const response = await fetch(isNew ? apiEndpoint : `${apiEndpoint}/${_id}`, {
      method: isNew ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemToSave),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save changes.");
    }

    const savedItem = {
      ...data,
      isEditing: false,
    };

    if (isNew) {
      if (!newItems || !setNewItems) {
        throw new Error("New items state is missing.");
      }

      setItems([savedItem, ...items]);
      setNewItems(newItems.filter((_, itemIndex) => itemIndex !== index));
    } else {
      const updatedItems = items.map((existingItem) =>
        existingItem._id === _id ? savedItem : existingItem
      );

      setItems(updatedItems);
    }

    if (setSuccessMessage) {
      setSuccessMessage("Changes saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  } catch (err) {
    console.error("Error saving item:", err);

    if (setError) {
      setError(err.message || "Something went wrong while saving changes.");
    }
  }
};

export const cancelEdit = ({
  index,
  isNew,
  newItems,
  setNewItems,
  items,
  setItems,
  originalItems,
  setOriginalItems,
}) => {
  if (isNew) {
    const updatedNewItems = [...newItems];
    updatedNewItems[index].isEditing = false;
    setNewItems(updatedNewItems);
  } else {
    const updatedItems = [...items];
    if (originalItems[index]) {
        updatedItems[index] = { ...originalItems[index], isEditing: false };
      } else {
        updatedItems[index].isEditing = false;
      }
    setItems(updatedItems);
    setOriginalItems((prev) => {
        const updatedOriginalItems = { ...prev };
        delete updatedOriginalItems[index];
        return updatedOriginalItems;
      });
  }
}

export const handleDelete = async (
  idOrIndex,
  isNewItem = false,
  type = "sales",
  setItems,
  setError
) => {
  try {
    if (setError) {
      setError("");
    }

    if (isNewItem) {
      setItems((prevItems) => prevItems.filter((_, i) => i !== idOrIndex));
      return;
    }

    if (!idOrIndex) {
      throw new Error(`Invalid ${type} ID provided for deletion.`);
    }

    const response = await fetch(`/api/${type}/${idOrIndex}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Failed to delete ${type}.`);
    }

    setItems((prevItems) =>
      prevItems.filter((item) => item._id !== idOrIndex)
    );
  } catch (err) {
    console.error(`Error deleting ${type}:`, err);

    if (setError) {
      setError(err.message || `Something went wrong while deleting ${type}.`);
    }
  }
};

export const applyFilters = (sales, filters) => {
    
    const {
      fromDate,
      toDate,
      selectedBusinessType,
      selectedIsWithBottle,
      searchName,
    } = filters;
  
    // Apply filters
    return sales.filter((sale) => {
      // Check date range filter
      const matchesDateRange = (() => {
        if (!fromDate && !toDate) return true;
        const saleDate = new Date(sale.dateOfPurchase);
        if (fromDate && toDate) {
          return saleDate >= new Date(fromDate) && saleDate <= new Date(toDate);
        } else if (fromDate) {
          return saleDate >= new Date(fromDate);
        } else if (toDate) {
          return saleDate <= new Date(toDate);
        }
      })();
  
      // Check business type filter
      const matchesBusinessType = selectedBusinessType
        ? sale.businessType === selectedBusinessType
        : true;
  
      // Check "With Bottle" filter
      const matchesIsWithBottle = selectedIsWithBottle
      ? (sale.isWithBottle === "yes" && selectedIsWithBottle === "yes") ||
        (sale.isWithBottle === "no" && selectedIsWithBottle === "no")
      : true;
  
      // Check product name filter
      const matchesName = searchName
        ? sale.productname.toLowerCase().includes(searchName.toLowerCase())
        : true;
  
      // Return true if all filters match
      return (
        matchesDateRange &&
        matchesBusinessType &&
        matchesIsWithBottle &&
        matchesName
      );
    });
  };

export const applyExpenseFilters = (expenses, filters) => {
  const {
    fromDate,
    toDate,
    selectedCategory,
    searchName,
  } = filters;

  // Apply filters
  return expenses.filter((expense) => {
    // Check date range filter
    const matchesDateRange = (() => {
      if (!fromDate && !toDate) return true;
      const expenseDate = new Date(expense.dateOfExpense);
      if (fromDate && toDate) {
        return expenseDate >= new Date(fromDate) && expenseDate <= new Date(toDate);
      } else if (fromDate) {
        return expenseDate >= new Date(fromDate);
      } else if (toDate) {
        return expenseDate <= new Date(toDate);
      }
    })();

    // Check business type filter
    const matchesCategory = selectedCategory
      ? expense.category === selectedCategory
      : true;

    // Check product name filter
    const matchesName = searchName
      ? expense.description.toLowerCase().includes(searchName.toLowerCase())
      : true;

    // Return true if all filters match
    return (
      matchesDateRange &&
      matchesCategory &&
      matchesName
    );
  });
};

export const applyProductFilters = (products, filters) => {
  const {
    selectedCategory,
    selectedScent,
    selectedColor,
    searchName,
  } = filters;

  // Apply filters
  return products.filter((product) => {

    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    const matchesScent = selectedScent
    ? product.scent === selectedScent
    : true;

    const matchesColor = selectedColor
    ? product.color === selectedColor
    : true;

    // Check product name filter
    const matchesName = searchName
      ? product.productname.toLowerCase().includes(searchName.toLowerCase())
      : true;

    // Return true if all filters match
    return (
      matchesCategory &&
      matchesScent &&
      matchesColor &&
      matchesName
    );
  });
};