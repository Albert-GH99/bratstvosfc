import PhoneOrderPreview from './PhoneOrderPreview';
import RealDashboardPreview from './RealDashboardPreview';
import SystemShowcaseVisual from './SystemShowcaseVisual';
import WhatsAppToSystemVisual from './WhatsAppToSystemVisual';

export function FuturisticDashboardMockup({ className = '' }) {
  return <RealDashboardPreview className={className} />;
}

export function DeviceFrameMockup({ className = '' }) {
  return <PhoneOrderPreview className={className} />;
}

export function ClientPortalPreview({ className = '' }) {
  return <SystemShowcaseVisual type="ecommerce" label="Customer checkout" className={className} />;
}

export function AdminDashboardPreview({ className = '' }) {
  return <RealDashboardPreview compact className={className} />;
}

export function AutomationFlowPreview({ className = '' }) {
  return <WhatsAppToSystemVisual className={className} />;
}

export default FuturisticDashboardMockup;
