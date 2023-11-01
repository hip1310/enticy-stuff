import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ExpandMore } from "@mui/icons-material";

type propsType = {
  categories?: string[];
  price?: string[];
  filter?: any;
  onChangeFilter: (key: string, value: string) => void;
};

const FilterContainer = (element: propsType) => {
  const { categories, price, onChangeFilter, filter } = element;
  return (
    <div className="h-4/5 ml-2.5 mt-2.5 p-5 fixed border-r hidden md:block">
      {categories ? (
        <>
          <div className="border-b">
            {/* Filter Categories */}
            <Typography className="ml-2">
              <b className="underline text-xl">Filters</b>
            </Typography>
            <Accordion elevation={0} defaultExpanded={true}>
              <AccordionSummary
                className="!p-0"
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Categories</Typography>
              </AccordionSummary>
              <AccordionDetails className="!pl-2 !pt-0 !pr-0">
                {categories?.map((categoryElement: string, index: number) => {
                  return (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={categoryElement}
                        name={categoryElement}
                        value={categoryElement}
                        checked={
                          filter["fields.category[in]"]?.includes(categoryElement) || false
                        }
                        onChange={(element) => {
                          // Handle category filter changes
                          if (!element.target.checked) {
                            onChangeFilter("category", "delete:"+categoryElement);
                          } else {
                            onChangeFilter("category", categoryElement);
                          }
                        }}
                      />
                      <label className="pl-1.5" htmlFor={categoryElement}>
                        {categoryElement}
                      </label>
                      <br></br>
                    </div>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="border-b">
            {/* Filter Price Range */}
            <Accordion elevation={0} defaultExpanded={true}>
              <AccordionSummary
                className="!p-0"
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Price</Typography>
              </AccordionSummary>
              <AccordionDetails className="!pl-2 !pt-0 !pr-0">
                {price?.map((element: string, index: number) => {
                  return (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={element}
                        name={element}
                        value={element}
                        checked={
                          (Number(filter["fields.price[lte]"])>=
                            Number(element.split("-")[0]) && Number(filter["fields.price[gte]"])<=Number(element.split("-")[0])) || false
                        }
                        onChange={(onChangeElement) => {
                          // Handle price filter changes
                          if (!onChangeElement.target.checked) {
                            onChangeFilter("price", "");
                          } else {
                            onChangeFilter("price", element);
                          }
                        }}
                      />
                      <label className="pl-1.5" htmlFor={element}>
                        {element}
                      </label>
                      <br></br>
                    </div>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default FilterContainer;
