import { forwardRef, createContext, useContext, useMemo } from "react";



// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Custom styles for SoftPagination
import SoftPaginationItemRoot from "components/SoftPagination/SoftPaginationItemRoot";

// The Pagination main context
const Context = createContext(null);

const SoftPagination = forwardRef(
  (
    {
      item = false,
      variant = "gradient",
      color = "info",
      size = "medium",
      active = false,
      children,
      ...rest
    },
    ref
  ) => {
    const context = item ? useContext(Context) : null;
    const paginationSize = context ? context.size : null;
    const value = useMemo(() => ({ variant, color, size }), [variant, color, size]);

    return (
      <Context.Provider value={value}>
        {item ? (
          <SoftPaginationItemRoot
            {...rest}
            ref={ref}
            variant={active ? context.variant : "outlined"}
            color={active ? context.color : "secondary"}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}
          >
            {children}
          </SoftPaginationItemRoot>
        ) : (
          <SoftBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ listStyle: "none" }}
          >
            {children}
          </SoftBox>
        )}
      </Context.Provider>
    );
  }
);


export default SoftPagination;
