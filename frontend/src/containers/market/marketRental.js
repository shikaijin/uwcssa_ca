import { Box, Stack } from "@mui/material";
import {
  filterClear,
  selectAllMarketItems,
} from "../../redux/slice/marketSlice";
import useMarketItemFilter, {
  marketItemFilterUpdate,
} from "../../components/Market/useMarketItemFilter";

import BackdropLoading from "../../components/BackdropLoading";
import FilterInfo from "../../components/Market/marketItemFilterInfo";
import LoadMore from "../../components/LoadMore";
import MarketComponent from "../../components/Market/MarketComponent";
import MarketImgTopFilter from "../../components/Market/marketImgTopFilter";
import MarketSkeleton from "../../components/Market/MarketSkeleton";
import React from "react";
import { marketItemStyle } from "../../components/Market/marketItemCss";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useStarter from "../../components/Market/useStarter";
import { useTitle } from "../../Hooks/useTitle";

export default function MarketRental() {
  const useStyles = marketItemStyle;
  useTitle("Rental");
  const classes = useStyles();
  const dispatch = useDispatch();
  const { darkTheme } = useSelector((state) => state.general);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      type: "Rental",
      sortKey: "original",
      min: "",
      max: "",
      marketRentalSaleRent: [],
      propertyType: [],
      airConditioningType: [],
      heatingType: [],
    },
  });
  const handleSearch = handleSubmit((data) => {
    marketItemFilterUpdate(data, dispatch);
  });

  const { filter: filterList } = useSelector((state) => state.market);
  const isFiltering = useMarketItemFilter(filterList, "Rental");
  const filteredItems = useSelector(selectAllMarketItems);

  const starter = useStarter(filteredItems, "all", isFiltering);

  const itemRenderList =
    filteredItems &&
    filteredItems.map((marketItem, marketItemIdx) => {
      return (
        <MarketComponent
          starter={starter}
          darkTheme={darkTheme}
          item={marketItem}
          type={marketItem.marketType.toLowerCase()}
          key={marketItemIdx}
        />
      );
    });

  const handleReset = () => {
    dispatch(filterClear());
    reset({
      type: "Rental",
      sortKey: "original",
      min: "",
      max: "",
      marketRentalSaleRent: [],
      propertyType: [],
      airConditioningType: [],
      heatingType: [],
    });
  };
  return (
    <Box className={classes.root}>
      {starter === false && <BackdropLoading />}
      <Stack
        direction={{ xs: "column", md: "row" }}
        className={classes.contain}
      >
        <FilterInfo
          form="plain"
          type="Rental"
          control={control}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
        <Box className={classes.img}>
          <MarketImgTopFilter
            control={control}
            type="Rental"
            handleSearch={handleSearch}
            handleReset={handleReset}
          />
          <Box className={classes.items}>
            {isFiltering && (
              <Box width="100%" margin="0.5rem" color="#6c6c6c" fontSize="14px">
                Found {filteredItems.length} related results...
              </Box>
            )}
            {starter === false ? <MarketSkeleton /> : itemRenderList}
            <LoadMore />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
