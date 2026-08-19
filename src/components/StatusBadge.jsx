import {
    getStatusColor,
} from "../utils/helpers";

export default function StatusBadge({
    status,
}) {
    return (
        <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(
                status
            )}`}
        >
            {status}
        </span>
    );
}