import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEFAULT_PLATFORM_FEE = 300;

const EduCatalystModule = buildModule("EduCatalystModule", (m) => {
  const platformFeePercent = m.getParameter("platformFeePercent", DEFAULT_PLATFORM_FEE);
  
  // Deploy with minimal options
  const eduCatalyst = m.contract("EduCatalyst", [platformFeePercent]);

  return { eduCatalyst };
});

export default EduCatalystModule;