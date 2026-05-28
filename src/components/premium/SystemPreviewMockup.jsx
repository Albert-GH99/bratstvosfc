import SystemShowcaseVisual from './SystemShowcaseVisual';

export default function SystemPreviewMockup({ type = 'ecommerce', label = 'Business', compact = false, className = '' }) {
  return <SystemShowcaseVisual type={type} label={label} compact={compact} className={className} />;
}

export function MiniSystemPreview(props) {
  return <SystemShowcaseVisual compact {...props} />;
}
