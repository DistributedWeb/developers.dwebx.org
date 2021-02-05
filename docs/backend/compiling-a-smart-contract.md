---
title : Compiling A Smart Contract
---


Compiling and deploying smart contracts on ARISEN requires a tool called [ARISEN CDT](https://github.com/arisenio/arisen.cdt). To install ARISEN CDT, follow the instructions below:

### Installing ARISEN CDT
```shell {}
git clone --recursive https://github.com/arisenio/arisen.cdt
cd arisen.cdt
./build.sh
sudo /.install.sh
```

### Creating A Test Contract
Create a file called `hello.cpp` with the following contents:
```c++ {}
#include <arisen/arisen.hpp>

using namespace arisen;

class [[arisen::contract]] hello : public contract {
  public:
    using contract::contract;

    [[arisen::action]]
    voice hi(name user) {
      print ("Hello, ", user);
    }
};

### Compiling The Contract
To compile our Hello contract to Web Assembly (.wasm), run the following command using ARISEN CDT's `arisen.cpp` utility:

```
arisen-cpp hello.cpp hello.wasm
```

This will output your contract into WebAssembly, which will ready it for deployment on ARISEN.

:::caution
#### What's next?
Learn how to deploy a smart contract to ARISEN and test it, [here](/backend/deploying-a-smart-contract).
:::