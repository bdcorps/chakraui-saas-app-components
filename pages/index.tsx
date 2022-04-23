import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useState } from "react";
import DisplayValue from "./displayvalue";
import DrawerHome from "./drawer";
import Modal from "./modal";
import Settings from "./settings";
import DataTable from "./table";

const Home: NextPage = () => {
  const [saleState, setSaleState] = useState(0); //0 - order, 1 - customer payment, 2 - settings
  const [merchantWallet, setMerchantWallet] = useState(
    "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"
  );
  const [salesTax, setSalesTax] = useState(7.25);

  const [email, setEmail] = useState("elon.tusk@gmail.com");
  const [name, setName] = useState("Elon Tusk");
  const [country, setCountry] = useState("US");
  const [street, setStreet] = useState("1105 Ludlam Dr.");
  const [city, setCity] = useState("Miami Springs");
  const [state, setState] = useState("FL");
  const [zip, setZip] = useState("33166");
  const [cc, setCC] = useState("4444333322221111");
  const [expiry, setExpiry] = useState("10/23");
  const [cvv, setCVV] = useState("123");

  const [order, setOrder] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const AMOUNT = 10;
  const tax = AMOUNT * (salesTax / 100);
  const toast = useToast();

  const getActualCost = async (reservationId: string) => {
    const response = await fetch(
      `https://api.testwyre.com/v3/orders/reservation/${reservationId}`,
      {
        body: JSON.stringify({}),
        headers: {
          Accept: "application/json",
          Authorization: "Bearer TEST-SK-MX4VW9MC-7WR7E9MJ-XNMZML8L-TU7NFP3G",
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    const data = await response.json();
    return data.sourceAmountWithoutFees;
  };

  const onButtonClick = async () => {
    setSubmitting(true);
    const body = {
      referrerAccountId: "AC_6EUV8R7MGXJ",
      amountIncludeFees: true,
      country,
      paymentMethod: "debit-card",
      sourceCurrency: "USD",
      destCurrency: "USDC",
      dest: "ethereum:0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413",
      sourceAmount: AMOUNT + tax,
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      state,
      street1: street,
      city,
      postalCode: zip,
      email,
      lockFields: [
        "email",
        "firstName",
        "lastName",
        "postalCode",
        "city",
        "state",
        "country",
        "street1",
      ],
    };

    const response = await fetch("https://api.testwyre.com/v3/orders/reserve", {
      body: JSON.stringify({
        referrerAccountId: "AC_6EUV8R7MGXJ",
        sourceAmount: AMOUNT + tax,
        amountIncludeFees: true,
        lockFields: ["sourceAmount"],
      }),
      headers: {
        Accept: "application/json",
        Authorization: "Bearer TEST-SK-MX4VW9MC-7WR7E9MJ-XNMZML8L-TU7NFP3G",
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const data = await response.json();
    console.log(data);

    const body2 = {
      debitCard: {
        number: cc,
        year: Number("20" + expiry.split("/")[1]),
        month: expiry.split("/")[0],
        cvv,
      },
      address: {
        postalCode: zip,
        city,
        state,
        country,
        street1: street,
      },
      reservationId: data.reservation,
      amount: AMOUNT + tax,
      sourceCurrency: "USD",
      destCurrency: "USDC",
      dest: "account:AC_YC3NT6GEZ8U",
      referrerAccountId: "AC_6EUV8R7MGXJ",
      givenName: name.split(" ")[0],
      familyName: name.split(" ")[1],
      email,
      ipAddress: "1.1.1.1",
      phone: "+14158122223",
    };

    console.log({ body2 });

    const response2 = await fetch(
      "https://api.testwyre.com/v3/debitcard/process/partner",
      {
        body: JSON.stringify(body2),
        headers: {
          Accept: "application/json",
          Authorization: "Bearer TEST-SK-MX4VW9MC-7WR7E9MJ-XNMZML8L-TU7NFP3G",
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    const data2 = await response2.json();

    console.log(data2);
    setOrder(data2.id);

    toast({
      title: "Processing payment...",
      description: "",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };

  const onOrderCheck = async () => {
    const response3 = await fetch(
      "https://api.testwyre.com/v3/orders/" + order,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data3 = await response3.json();
    const { status, errorMessage } = data3;

    if (data3) {
      toast({
        title: "Payment status",
        description: errorMessage,
        status: status === "FAILED" ? "error" : "info",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Processing payment...",
        description: "",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    }

    console.log(data3);
  };

  const Order = () => {
    const tax = AMOUNT * (salesTax / 100);
    return (
      <Center>
        <VStack spacing={4} w={500} align="left">
          <Heading>Checkout | Order #111</Heading>
          <Text color="gray.500">
            Turn the unit towards the customer after confirming the order
          </Text>
          <DisplayValue label="Indica (x1)" value={`$${AMOUNT}`} />
          <Divider />
          <DisplayValue label="Sales Tax" value={`$${tax}`} />
          <DisplayValue label="Total" value={`$${tax + AMOUNT}`} />
          <Button onClick={() => setSaleState(1)}>Confirm order</Button>
        </VStack>
      </Center>
    );
  };

  const Settings = () => {
    return (
      <Center>
        <VStack spacing={4} w={500}>
          <FormControl>
            <FormLabel>Wallet address</FormLabel>
            <Input
              placeholder="0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"
              defaultValue={merchantWallet}
              onChange={(evt: any) => {
                setMerchantWallet(evt.target[0].value);
              }}
            />
          </FormControl>

          <Select
            placeholder="Tax Location"
            defaultValue={salesTax}
            onChange={(evt: any) => {
              setSalesTax(evt.target.value);
            }}
          >
            <option value={7.25}>FL</option>
            <option value={6}>CA</option>
          </Select>

          <Text color="gray.400">{`Customers will be charged ${salesTax}% sales tax`}</Text>
        </VStack>
      </Center>
    );
  };

  const CustomerPay = () => {
    return (
      <Center>
        <VStack spacing={4} w={500} align="left">
          <Heading>Customer Payment</Heading>
          <Text fontWeight="medium">Personal Info</Text>
          <FormControl>
            <Input
              placeholder="elon.tusk@gmail.com"
              defaultValue={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </FormControl>

          <FormControl>
            <Input
              onChange={(evt) => setName(evt.target.value)}
              defaultValue={name}
              placeholder="Name"
            />
          </FormControl>

          <Text fontWeight="medium">Shipping address</Text>
          <FormControl>
            <Select
              placeholder="Country"
              onChange={(evt) => setCountry(evt.target.value)}
              defaultValue={country}
            >
              <option value="US">US</option>
              <option value="CA">CA</option>
            </Select>
          </FormControl>
          <FormControl>
            <Input
              onChange={(evt) => setStreet(evt.target.value)}
              defaultValue={street}
              placeholder="Street Address"
            />
          </FormControl>

          <HStack spacing={4}>
            <FormControl>
              <Input
                onChange={(evt) => setCity(evt.target.value)}
                placeholder="City"
                defaultValue={city}
              />
            </FormControl>

            <FormControl>
              <Input
                onChange={(evt) => setZip(evt.target.value)}
                defaultValue={zip}
                placeholder="Zip code"
              />
            </FormControl>
          </HStack>

          <FormControl>
            <Select
              placeholder="State"
              defaultValue={state}
              onChange={(evt) => setState(evt.target.value)}
            >
              <option value="FL">Florida</option>
              <option value="CA">California</option>
            </Select>
          </FormControl>

          <HStack w="full">
            <FormControl>
              <Text>Amount</Text>
              <Input isDisabled value={AMOUNT} />
            </FormControl>

            <FormControl>
              <Text>{`Sales Tax (${salesTax}%)`}</Text>
              <Input isDisabled value={`$${tax}`} />
            </FormControl>
          </HStack>

          <Text fontWeight="medium">Payment Info</Text>
          <FormControl>
            <Input
              onChange={(evt) => setCC(evt.target.value)}
              defaultValue={cc}
              placeholder="Credit Card number"
            />
          </FormControl>

          <HStack spacing={4}>
            <FormControl>
              <Input
                onChange={(evt) => setExpiry(evt.target.value)}
                defaultValue={expiry}
                placeholder="Expiration"
              />
            </FormControl>
            <FormControl>
              <Input
                onChange={(evt) => setCVV(evt.target.value)}
                defaultValue={cvv}
                placeholder="CVV"
              />
            </FormControl>
          </HStack>

          <Checkbox defaultChecked>
            Save my information for faster payments next time
          </Checkbox>

          <Checkbox defaultChecked>Send me cool stuff in my email</Checkbox>

          {/* <Text color="gray.300">The freelancer will get </Text> */}

          {!submitting && (
            <Button variant="solid" onClick={onButtonClick}>
              {`Pay $${tax + AMOUNT}`}
            </Button>
          )}

          {submitting && <Button onClick={onOrderCheck}>Check Order</Button>}
        </VStack>
      </Center>
    );
  };

  return (
    <Box p={10}>
      <HStack align="flex-start" justify="flex-start">
        {/* <DrawerHome /> */}
        <Box p={10} w="full">
          <Flex>
            <Spacer />

            <Button
              variant="ghost"
              onClick={() => {
                saleState === 2 ? setSaleState(0) : setSaleState(2);
              }}
            >
              Settings
            </Button>
          </Flex>

          {saleState === 0 && <Order />}
          {saleState === 1 && <CustomerPay />}
          {saleState === 2 && <Settings />}
        </Box>
      </HStack>
    </Box>
  );
};
export default Home;
